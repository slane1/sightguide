import Search from "./Search.jsx";

export default function Header({entries}){

    return (
        <div>
        <Search entries={entries}/>
        </div>
    );
}