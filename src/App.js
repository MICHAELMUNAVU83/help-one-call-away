import "./App.css";
import React, { useState, useEffect } from "react";
import { hospitals } from "./db";
import {policeStations} from "./db";

function App() {
  const [countyName , setCountyName] = useState("");
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

  const showAllHospitals = hospitals.map((hospital) => (
    hospital.county === countyName && <div>
      <p>{hospital.name}</p>
    </div>
  ));
  const showAllPoliceStations = policeStations.map((station) => (
    station.county === countyName && <div>
      <p>{station.name}</p>
    </div>
  ));

  return <div className="App">
    <h2> Hospitals In {countyName}</h2>
   
    {showAllHospitals}
    <h2> Police stations In {countyName}</h2>

    {showAllPoliceStations}
    </div>;
}

export default App;
