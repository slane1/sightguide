// Gets a searchParameter and a the array from entries to search in, returns an Array of results in searchResults. The Array contains the id's of the search results
// export function searchQuery(entries, searchParameter) {
//     const searchResults = entries
//         .filter(item => Object.values(item.fields).includes(searchParameter))
//         .map(item => item.fields.id);
//     return searchResults;
// }

// function searchQuery(parameter) {
//     const result = entries
//         .find(item => Object.values(item.fields).includes(parameter))
//     return console.log("result",result.fields);
// }

// function searchQuery(parameter) {
//     const results = entries
//         .filter(item => Object.values(item.fields).includes(parameter))
//     return console.log("results", results.map(result => result.fields));
// }

{/* <button onClick={() =>{sortQuery(entries)}}>Sort A-Z</button> */}



// function searchQuery(parameter) {
//     const results = entries
//         .filter(item => Object.values(item.fields).includes(parameter));
//     const resultsObject = {};
//     results.forEach((result, sid) => {
//         resultsObject[`sid${sid + 1}`] = result.fields;
//     });
//     return setSearchEntries(resultsObject);
// }