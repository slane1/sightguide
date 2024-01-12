// Import Utility
import { useState, useEffect } from "react";
import { createClient } from "contentful";
// Import von Components
import Header from "./components/Header.jsx";
import ListView from "./components/ListView.jsx"
import Footer from "./components/Footer.jsx";

export default function App() {

  // Setze gemeinsame useStates
  const [entries, setEntries] = useState([]);
  const [loading, setIsLoading] = useState(true);

  // Erzeuge client für API abfrage
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  });

  // Lade Daten via API in entries
  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* <Header /> */}
      <h1>Sightguide</h1>
      {loading ? (
      <p>Loading...</p>
      ) : ( <ListView entries={entries} />)}
      <Footer />
    </>
  );
}