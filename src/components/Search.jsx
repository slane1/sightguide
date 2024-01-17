import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext'
import {sortQuery} from '../util/Sort'

export default function Search(){
const { entries, setSearchEntries, searchEntries } = useContext(DataContext);
const e = "Rom";


function searchQuery(parameter) {
    const results = entries
        .filter(item => Object.values(item.fields).includes(parameter));
    const resultsArray = results.map(result => result);
    setSearchEntries(resultsArray);
    return resultsArray;
}

    return (
        <div>
            <form action=""
            className='flex flex-row'>
                <input type="text"
                className="h-14 w-3/4 md:w-96 pr-8 pl-5  z-0 outline-1 outline outline-gray-800 shadow-md focus:shadow focus:outline-none rounded-full "
                placeholder="The place do you want to know?..." />
                <button 
                    onClick={() =>{sortQuery(entries)}}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            viewBox="0 0 24 24"
                            fill="currentColor" 
                            className="ml-3"> 
                            <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
                        </svg>
                </button>
                <button onClick={() =>{searchQuery(entries,e)}}></button>
            </form>
        </div>
    );
}