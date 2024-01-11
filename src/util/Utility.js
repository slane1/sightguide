
// Gets a searchParameter and a the array from entries to search in, Pushing an Array of results. containing the id's of the search results
export function searchQuery(entries, searchParameter) {
    const searchResults = entries
        .filter(item => Object.values(item.fields).includes(searchParameter))
        .map(item => item.fields.id);
    return searchResults;
}