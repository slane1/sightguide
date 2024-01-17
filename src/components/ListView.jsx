import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import ListItem from './ListItem';

export default function ListView() {
  const { entries, searchEntries, displayEntries, setDisplayEntries } = useContext(DataContext);

  useEffect(() => {
    if (searchEntries.length > 0) {
      setDisplayEntries(searchEntries);
    } else {
      setDisplayEntries(entries);
    }
  }, [entries, searchEntries]);

  return (
    <div>
      {displayEntries.map((item) => (
        <ListItem item={item} key={item.fields.id} />
      ))}
    </div>
  );
}