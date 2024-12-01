import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Input } from "antd";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();


  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search?query=${query}`)
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center p-6">
      <div className="flex w-full border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:shadow-md">
        <Input
          type="text"
          placeholder="Tìm kiếm thực vật..."
          className="flex-grow px-6 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={handleSearch}
        />
        <button
          className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSearch}
        >
          🔍
        </button>
      </div>

      <div className="mt-6 flex space-x-4">
      </div>
    </div>
  );
};

export default SearchBar;
