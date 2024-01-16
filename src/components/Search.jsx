import { sortQuery } from '../util/Sort';
import { searchQuery } from '../util/Utility'


export default function Search({entries}){
const e = "Kolloseum"

    return (
        <div>
            <form action="">
                <input type="text" />
                <button onClick={() =>{searchQuery(entries,e)}}>Search</button>
                <button onClick={() =>{sortQuery(entries)}}>Sort A-Z</button>
            </form>
        </div>
    );
}