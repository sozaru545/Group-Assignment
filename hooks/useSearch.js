// hooks/useSearch.js
import { useState } from "react";

const useSearch = (data) => {
  const [query, setQuery] = useState("");

  const filteredResults = data.filter(item =>
    item.text.toLowerCase().includes(query.toLowerCase())
  );

  return { query, setQuery, results: filteredResults };
};

export default useSearch;


