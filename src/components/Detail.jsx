import Map from "./Map";
import { useParams, useLocation } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";
import React from "react";

export default function Detail() {
  const location = useLocation();
  const { item } = location.state;

  return (
    <div className="flex flex-col max-w-[80%]" key={item.id}>
      <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold underline mb-3">{item.name}</h3>
        <div className="flex flex-row mb-2 space-x-4 justify-center max-w-[20em]">
          {item.images.map((img, index) => (
            <img
              key={index}
              // src={img.fields.file.url}
              // alt={img.fields.file.fileName}
              src={img.url}
              alt={img.fileName}
            />
          ))}
        </div>
        <ul className="flex flex-col mb-3">
          <li><span className="font-bold">Ort: </span>{item.stadt}</li>
          <li><span className="font-bold">Land: </span>{item.land}</li>
          <li><span className="font-bold">Bauzeit: </span>{item.bauzeit}</li>
          <li><span className="font-bold">Epoche: </span>{item.epoche}</li>
          <li><span className="font-bold">Bauherr </span> {item.bauherr}</li>
          <li className="mb-4">
          {/* <span className="font-bold">Geolocation: </span> {item.geolocation[0].lon + " latitude und " + item.geolocation[0].lat + " longitude"} */}
          </li>
          <li className="mb-1">{item.beschreibung}</li>
        </ul>
      </div>
      <br />
      <div>
        <Map geolocation={item.geolocation} />
      </div>
    </div>
  );
}
