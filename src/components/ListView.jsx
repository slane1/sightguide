import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import ListItem from './ListItem';

export default function ListView() {
  const { entries } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayEntries, setDisplayEntries] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const filteredEntries = entries.filter(
        (item) =>
          item.fields.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.fields.bauzeit
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.fields.bauherr.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayEntries(filteredEntries);
    } else {
      setDisplayEntries(entries);
    }
  }, [entries, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="grid  md:grid-cols-1 lg:grid-cols-6 gap-8 ">
      <input
        type='text'
        placeholder='Search'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {displayEntries.map((item) => (
        <ListItem item={item} key={item.fields.id} />
      ))}
    </div>
  );
}
