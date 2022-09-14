import "./App.css";
import React, { useEffect } from "react";
import { hospitals } from "./db";

function App() {
  const showPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      });
    }
  };
  useEffect(() => {
    showPosition();
  }, []);

  const showAllHospitals = hospitals.map((hospital) => (
    <div key={hospital.id}>
      <h1>{hospital.name}</h1>
    </div>
  ));

  return <div className="App">{showAllHospitals}</div>;
}

export default App;
