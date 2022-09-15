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
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=9b2570bb3d51443da6ba9468a530375b`,
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
          .catch((error) => {
            console.error("Error:", error);
          })
          .then((response) => {
            console.log(response);
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
        <div className="each-hospital-div" key={hospital.id}>
          <h2>{hospital.name}</h2>
          <div >
            <span className="location-title">Location : </span> <span className="location-value">{hospital.location}</span>
          </div>

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
        <div className="each-police-div" key={station.id}>
          <h2>{station.name}</h2>
          <div>
            <span className="phone">{station.number}</span>
            <a href={`tel:${station.number}`}>
              {" "}
              <BiPhoneCall />{" "}
            </a>
          </div>
        </div>
      )
  );
  const showPoliceButton = police && (
    <div className="button">
      <button className="police-button" onClick={() => setPolice(!police)}>Show Police stations</button>
    </div>
  );
  const showHospitalButton = !police && (
    <div className="button">
      <button className="hospital-button" onClick={() => setPolice(!police)}>Show Hospitals</button>
    </div>
  );

  return (
    <div className="App">
      {showPoliceButton}
      {showHospitalButton}
      <p className="h1">{countyName.toUpperCase()} ESSENTIAL SERVICES</p>
      <div className="all-hospitals-div">{showAllHospitals}</div>
      
      <div className="all-police-div">{showAllPoliceStations}</div>
    </div>
  );
}

export default App;
