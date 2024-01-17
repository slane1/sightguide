import Search from "./Search.jsx";
import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext'

export default function Header(){
const { loading } = useContext(DataContext);

    
    return (
        <div className="mt-12">
        {loading ? (
            <p>Loading...</p>
            ) : ( <Search />)}
        </div>
    );
}