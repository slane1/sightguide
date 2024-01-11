export function SearchQuery(apidata, searchParameter){
    const resultArray = [];
    apidata.forEach(i => {
        Object.keys(i).forEach(field => {
            if (i[field] === searchParameter){
                resultArray.push(i.id)
            }
        })
    });
    return resultArray;
}