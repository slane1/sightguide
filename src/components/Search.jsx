export default function Search(){

    return (
        <div>
            <form action="">
                <input type="text" />
                <button>Search</button>
                <button>Filter</button>
                <button onClick={handleSort} id="sort-a-z">Sort A-Z</button>
            </form>
        </div>
    );
}