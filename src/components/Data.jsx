import { useState, useEffect } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: "k4qzcaarqjx8",
  accessToken: "hHDWVwqsUN9SVlETsioTZGgR4NogPWCdvZFGaldqm9o",
});

export default function Data() {
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
        // console.log(field.fields.stadt);
        // console.log(field.fields.geolocation);
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
            <li>
              {field.fields.stadt.long +
                " " +
                field.fields.stadt.lat}
            </li>
            {/* <li>{field.fields.land}</li> */}
            <li>{field.fields.bauzeit}</li>
            <li>{field.fields.bauherr}</li>
            <li>{field.fields.epoche}</li>
            {/* <img
              src={field.fields.images[0]}
              alt={field.fields.name}
              width="50%"
            /> */}
            <li>{field.fields.beschreibung}</li>
          </div>
        );
      })}
    </div>
  );
}
