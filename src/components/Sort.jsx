import { useState, useEffect } from "react";
import { createClient } from "contentful";
import ListItem from "./ListItem";
import Data from "./Data";

export default function Sort() {

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

        useEffect (() => {
            setEntries(entries)
        })

        function handleSort() {
            const sortedData = [...entries].sort((a,b) => {
                return a.name > b.name ? 1 : -1
            })
            setEntries(sortedData)
        }

        const listComponents = entries.map((fields) => {
            return <St key={fields.name} first={fields.name}
            last={fields.name} number={fields.id}/>
        })

        return (
            <>
                <button onClick={handleSort} id="sort-a-z">Sort A-Z</button>
                <ul>
                    {listComponents}
                </ul>
            </>
        )
    }