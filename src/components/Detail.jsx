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
      <div className="flex flex-col">
        <div className="flex flex-row mb-2 space-x-4 justify-between max-w-[10em]">
          {item.fields.images.map((img) => {
            return (
              <img src={img.fields.file.url} alt={img.fields.file.fileName} />
            );
          })}
        </div>
        <h3 className="text-3xl font-bold underline">{item.fields.name}</h3>
        <li>{item.fields.epoche}</li>
        <li>
          {item.fields.geolocation.lon + " " + item.fields.geolocation.lat}
        </li>
        <li>{item.fields.stadt}</li>
        <li>{item.fields.land}</li>
        <li>{item.fields.bauzeit}</li>
        <li>{item.fields.bauherr}</li>
        <li className="mb-3">{item.fields.beschreibung}</li>
      </div>
      <br />
      <Map geolocation={item.fields.geolocation} />
    </div>
  );
}
