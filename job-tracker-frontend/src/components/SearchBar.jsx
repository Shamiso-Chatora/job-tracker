import { useState } from "react";
function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onSearch(searchTerm);
    }

    return (
    <form onSubmit={handleSubmit} className="flex gap-3">
        <input
            type="text"
            placeholder="Search by company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />

        <button
            type="submit"
            className="bg-slate-900 text-white px-5 py-3 rounded-xl font-medium hover:bg-slate-800 transition"
        >
            Search
        </button>
    </form>
);
}
export default SearchBar;