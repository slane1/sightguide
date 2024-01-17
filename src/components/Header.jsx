import Search from "./Search.jsx";

export default function Header({entries}){
    
    return (
        <div className="mt-12">
        <Search entries={entries}/>
        </div>
    );
}