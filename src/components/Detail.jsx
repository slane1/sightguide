import Map from "./Map";
import { useParams, useLocation } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";
import React from "react";

export default function Detail() {
  const location = useLocation();
  console.log("Detail::location: ", location);
  const { item } = location.state;
  // const { itemPath } = useParams();
  // const { entries } = useContext(DataContext);

  // let item2 = entries.map((dings) => {
  //   // console.log(
  //   //   "hallo",
  //   //   dings.fields.name.toLowerCase().replaceAll(" ", "-") == itemPath
  //   // );
  //   return dings.fields.name.toLowerCase().replaceAll(" ", "-") == itemPath
  //     ? dings
  //     : null;
  // });
  // const item = item[0];
  // console.log("Detail::item: ", item);

  return (
    <div className="detail" key={item.fields.id}>
      <div className="c">
        <div className="c visual">
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
        <li>{item.fields.beschreibung}</li>
      </div>
      <br />
      <Map geolocation={item.fields.geolocation} />
    </div>
  );
}
