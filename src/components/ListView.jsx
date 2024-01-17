import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import ListItem from './ListItem';

export default function ListView() {
  const { entries, searchEntries, displayEntries, setDisplayEntries } = useContext(DataContext);

  // useEffect(() => {
  //   if (searchEntries.length > 0) {
  //     setDisplayEntries(searchEntries);
  //   } else {
  //     setDisplayEntries(entries);
  //   }
  // }, [entries, searchEntries]);
  
  useEffect(() => {
    console.log("Entries: ", entries);
    console.log("Search Entries: ", searchEntries);
    if (searchEntries.length > 0) {
      setDisplayEntries(searchEntries);
    } else {
      setDisplayEntries(entries);
    }
  }, [entries, searchEntries]);

  return (
    <div className="grid  md:grid-cols-1 lg:grid-cols-6 gap-8 ">
      {entries.map((item) => {
        return <ListItem item={item} key={item.fields.id} />;
      })}
    </div>
  );
}