import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext'
import ListItem from "./ListItem";

export default function ListView() {
  const { entries } = useContext(DataContext);

  return (
    <div>
      {entries.map((item) => {
        return <ListItem item={item} key={item.fields.id} />;
      })}
    </div>
  );
}
