import { sortQuery } from '../util/Sort';
import { searchQuery } from '../util/Utility'


export default function Search(){

    return (
        <div>
            <form action="">
                <input type="text" />
                <button onClick={searchQuery()}>Search</button>
                <button onClick={sortQuery()}>Sort A-Z</button>
            </form>
        </div>
    );
}