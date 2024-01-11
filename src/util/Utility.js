export function searchQuery(entries, searchParameter) {
    return entries
        .filter(item => Object.values(item.fields).includes(searchParameter))
        .map(item => item.fields.id);
}