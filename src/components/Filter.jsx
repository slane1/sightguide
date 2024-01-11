export default function Filter() {

    const onFilterChange = (event) => {
        const newText = event.target.value;
    
        setFilterText(newText);
    
        const filtered = data.filter((hit) =>
          hit.title.toLowerCase().includes(newText.toLowerCase())
        );
        setFilteredHits(filtered);
      };
}