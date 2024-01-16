import { useState, useEffect } from "react";
import { createClient } from "contentful";
import ListItem from "./ListItem";
import { searchQuery } from "../util/Utility";
import { sortQuery } from "../util/Sort";

export default function ListView() {
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
      {entries.map((item) => {
        // console.log(item.fields);
        // console.log(item.fields.geolocation);
        return <ListItem item={item} key={item.fields.id}/>;
      })}
    </div>
  );
}
