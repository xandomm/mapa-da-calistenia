function debounce(callback: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let timerId: NodeJS.Timeout;
  
    return function debouncedFunction(...args: any[]) {
      clearTimeout(timerId);
  
      timerId = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }
  
  // Example usage
  function search(query: string) {
    // Perform search operation here
    console.log(`Searching for '${query}'...`);
  }
  
  const debouncedSearch = debounce(search, 3000);
  
  // Call debouncedSearch function multiple times within 3 seconds
  debouncedSearch('apple');
  debouncedSearch('banana');
  debouncedSearch('orange');
  
  // Only the last search operation will be executed after the 3-second debounce period
  