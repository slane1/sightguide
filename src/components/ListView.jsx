import { useState, useEffect } from "react";

export default function ListView({entries}){
    return (
    <ul>
        {entries.map((field) => {
            console.log("field log",field.fields.id);
        return (
            <div>
            <li key={field.fields.id}>
                <div><img src={field.fields.images[0].fields.file.url} alt="" /></div>
                <div>{field.fields.name}</div>
                <div>ADRESSE HIER</div>
            </li>
            </div>
        );
        })}
    </ul>
    );
}