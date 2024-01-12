export function sortQuery(entries) {
    const sortResults = entries
    .sort((a,b) => a.name > b.name ? 1 : -1)
    return sortResults;
}