import { useState, useEffect } from "react";

export default function Sort() {
    
    function List (props) {
        const [entries, setEntries] = useState([])

        useEffect (() => {
            setSampleData(props.sampleData)
        }, [])

        function handleSort() {
            const sortedData = [...entries].sort((a,b) => {
                return a.name > b.name ? 1 : -1
            })
            setSampleData(sortedData)
        }

        const listComponents = entries.map((fields) => {
            return <ListItem key={object.number} first={object.first}
            last={object.last} number={object.number}/>
        })

        return (
            <>
                <button onClick={handleSort} id="sort-a-z">Sort A-Z</button>
                <ul>
                    {listComponents}
                </ul>
            </>
        )
    }
}