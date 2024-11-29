import { useState } from "react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") return;
    console.log("Searching for:", query);
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      {/* Input Field */}
      <div className="flex w-full border border-gray-300 rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="Tìm kiếm thực vật..."
          className="flex-grow px-6 py-3 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-4 bg-gray-100 hover:bg-gray-200"
          onClick={handleSearch}
        >
          🔍
        </button>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex space-x-4">
      </div>
    </div>
  );
};

export default SearchBar;
