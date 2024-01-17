import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext'

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
            <form action="">
                <input type="text" />
                <button onClick={() =>{searchQuery(e)}}>Search</button>
            </form>
        </div>
    );
}