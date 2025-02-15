// Countries Component
import React from "react";
import "./Countries.css";

export default function Countries({ flag, name}) {
  return (
    <div className="countryCard">
      <div>
        <img
          src={flag}
          alt= {`flag of ${name}`}
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <h2>{name}</h2>
    </div>
  );
}