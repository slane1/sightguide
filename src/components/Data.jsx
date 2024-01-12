import { useState, useEffect } from "react";
import { createClient } from "contentful";
import {searchQuery} from "../util/Utility"
import {sortQuery} from "../util/Sort";

export default function Data() {
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  });

  const [entries, setEntries] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    client
      .getEntries()
      .then((response) => {
        setEntries(response.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <p>Hallo Welt</p>
      {entries.map((field) => {
        return (
          <div key={field.fields.id}>
            <li>{field.fields.id}</li>
            <li>{field.fields.id}</li>
            <li>{field.fields.name}</li>
            <li>
              {field.fields.geolocation.long +
                " " +
                field.fields.geolocation.lat}
            </li>
            <li>{field.fields.stadt.long + " " + field.fields.stadt.lat}</li>
            {/* <li>{field.fields.land}</li> */}
            <li>{field.fields.bauzeit}</li>
            <li>{field.fields.bauherr}</li>
            <li>{field.fields.epoche}</li>
            <div>
              {field.fields.images.map((img) => {
                return (
                  <img
                    src={img.fields.file.url}
                    alt={img.fields.file.fileName}
                    width="50%"
                  />
                );
              })}
            </div>
            <li>{field.fields.beschreibung}</li>
          </div>
        );
      })}
    </div>
  );
}
