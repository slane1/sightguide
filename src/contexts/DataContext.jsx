import { createContext, useEffect, useState } from "react";
import { createClient } from "contentful";
export const DataContext = createContext();

export default function DataContextProvider({ children }) {
// Setze gemeinsame useStates
    const [entries, setEntries] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [searchEntries, setSearchEntries] = useState([])
    const [displayEntries, setDisplayEntries] = useState([]);
// Erzeuge client für API abfrage
    const client = createClient({
        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
        accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    });

// Lade Daten via API in entries
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            client
            .getEntries()
            .then((response) => {
                setEntries(response.items);
                setIsLoading(false);
                console.log(response.items);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
        }
        fetchData();
    }, []);


    return (
        <DataContext.Provider 
            value=
            {{
            entries, 
            setEntries, 
            loading, 
            setIsLoading,
            searchEntries,
            setSearchEntries,
            displayEntries,
            setDisplayEntries
            }}
        >
        {children}
        </DataContext.Provider>
    )
}