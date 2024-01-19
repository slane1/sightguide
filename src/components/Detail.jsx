import Map from "./Map";
import { useParams, useLocation } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";
import React from "react";

export default function Detail() {
  const location = useLocation();
  console.log("Detail::location: ", location);
  const { item } = location.state;

  return (
    <div className="flex flex-col max-w-[80%]" key={item.fields.id}>
      <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold underline mb-3">{item.fields.name}</h3>
        <div className="flex flex-row mb-2 space-x-4 justify-center max-w-[20em]">
          {item.fields.images.map((img, index) => (
            <img
              key={index}
              src={img.fields.file.url}
              alt={img.fields.file.fileName}
            />
          ))}
        </div>
        <ul className="mb-3">
          <li><span>Ort: </span>{item.fields.stadt}</li>
          <li><span>Land: </span>{item.fields.land}</li>
          <li><span>Bauzeit: </span>{item.fields.bauzeit}</li>
          <li><span>Epoche: </span>{item.fields.epoche}</li>
          <li><span>Bauherr </span> {item.fields.bauherr}</li>
          <li className="mb-4">
          <span>Geolocation: </span> {item.fields.geolocation.lon + " " + item.fields.geolocation.lat}
          </li>
          <li className="mb-1">{item.fields.beschreibung}</li>
        </ul>
      </div>
      <br />
      <div>
        <Map geolocation={item.fields.geolocation} />
      </div>
    </div>
  );
}
