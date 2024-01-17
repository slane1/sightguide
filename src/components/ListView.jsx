import { useState, useEffect } from "react";
import { createClient } from "contentful";
import ListItem from "./ListItem";

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
    <div className="grid  md:grid-cols-1 lg:grid-cols-6 gap-8 ">
      {entries.map((item) => {
        return <ListItem item={item} key={item.fields.id} />;
      })}
    </div>
  );
}
