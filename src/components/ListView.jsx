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
          item.fields.stadt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.fields.land.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.fields.epoche.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <>
    <div className=' mb-3'>
    <form action=""
    className='flex flex-row'>
    <input
        type='text'
        value={searchTerm}
        onChange={handleSearchChange}
        className="h-14 w-3/4 md:w-96 pr-8 pl-5  z-0 outline-1 outline outline-gray-800 shadow-md focus:shadow focus:outline-none rounded-full "
        placeholder="What place do you want to know?..." />
            <button>
            <svg xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="currentColor" 
                className="ml-3"> 
                <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
            </svg>
    </button>
      </form>
      </div>
    <div className="grid  sm:grid-cols-1 md:grid-cols-4  lg:grid-cols-6 gap-8 p-10 ">
    {displayEntries.map((item) => (
        <ListItem item={item} key={item.fields.id} />
      ))}
    </div>
    </>
  );
}
