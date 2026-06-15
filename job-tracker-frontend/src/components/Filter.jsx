function Filter({ onFilter }) {
    return (
    <select
        onChange={(e) => onFilter(e.target.value)}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
    >
        <option value="">All statuses</option>
        <option value="SAVED">Saved</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
    </select>
);
}

export default Filter;