import { useState, useEffect } from "react";
import { createClient } from "contentful";
import Detail from "./Detail";

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
      <h2>Einträge:</h2>

      {entries.map((item) => {
        // console.log(item.fields);
        // console.log(item.fields.geolocation);
        return <Detail item={item} />;
      })}
    </div>
  );
}
