import "./App.css";
import React, { useState, useEffect } from "react";
import { hospitals } from "./db";
import { policeStations } from "./db";
import { BiPhoneCall } from "react-icons/bi";

function App() {
  const [countyName, setCountyName] = useState("");
  const [police, setPolice] = useState(true);
  const showPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f25a890891384788ae4c5f991cf265fb`,
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
          .catch((error) => {
            console.error("Error:", error);
          })
          .then((response) => {
            console.log(response.results[0].components.state);
            setCountyName(response.results[0].components.state);
          });
      });
    }
  };
  useEffect(() => {
    showPosition();
  }, []);

  const showAllHospitals = hospitals.map(
    (hospital) =>
      hospital.county === countyName &&
      police && (
        <div>
          <p>{hospital.name}</p>
          <span>Location : </span> <span>{hospital.location}</span>
          <div>
            <span className="phone">{hospital.number}</span>
            <a href={`tel:${hospital.number}`}>
              {" "}
              <BiPhoneCall />{" "}
            </a>
          </div>
        </div>
      )
  );
  const showAllPoliceStations = policeStations.map(
    (station) =>
      station.county === countyName &&
      !police && (
        <div>
          <p>{station.name}</p>
          <span className="phone">{station.number}</span>
          <a href={`tel:${station.number}`}>
            {" "}
            <BiPhoneCall />{" "}
          </a>
        </div>
      )
  );
  const showPoliceButton = police && (
    <button onClick={() => setPolice(!police)}>Show Police stations</button>
  );
  const showHospitalButton = !police && (
    <button onClick={() => setPolice(!police)}>Show Hospitals</button>
  );

  return (
    <div className="App">
      {showPoliceButton}
      {showHospitalButton}
      <h1>{countyName} ESSENTIAL SERVICES</h1>

      {showAllHospitals}

      {showAllPoliceStations}
    </div>
  );
}

export default App;
