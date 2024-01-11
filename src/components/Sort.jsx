export default function Sort() {
    
    const onSearchChange = (event) => {
        const newText = event.target.value;
        if (newText) {
          setSearchText(newText);
          setLoading(<SpinnerCircularSplit />);
        }
      };
}