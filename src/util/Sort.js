export function sortQuery(entries, sortParameter) {
    const sortResults = entries.filter((a) => a.name > 0)
    .sort((a,b) => a.name > b.name ? 1 : -1)
    return sortResults;
}


// const sortResults = entries
// .filter((a) => a.name > 0)
// .sort((a,b) => a.name > b.name ? 1 : -1)