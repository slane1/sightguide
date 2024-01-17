import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext'

export default function Search(){
const { entries, setSearchEntries } = useContext(DataContext);
const e = "Rom";


function searchQuery(parameter) {
    const results = entries
        .filter(item => Object.values(item.fields).includes(parameter));
    const resultsObject = {};
    results.forEach((result, sid) => {
        resultsObject[`sid${sid + 1}`] = result.fields;
    });

    return console.log("results", resultsObject.sid1);
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