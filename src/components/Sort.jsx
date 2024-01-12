import { useState, useEffect } from "react";
import { createClient } from "contentful";

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

        // useEffect (() => {
        //     setEntries(entries)
        // })


            const sortData = entries.filter((a) => a.name > 0)
            .sort((a,b) => a.name > b.name ? 1 : -1)
            // setEntries(sortData)


        // const listComponents = entries.map((fields) => {
        //     return <St key={fields.name} first={fields.name}
        //     last={fields.name} number={fields.id}/>
        // })

        const listItem = sortData.map( (fields) => {
            return (
                <div>
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
            )
        })
    
        return (
            <>
                <button id="sort-a-z">Sort A-Z</button>
                <div key={field.fields.id}>
                    {listItem}
                </div>
            </>
        )
    }