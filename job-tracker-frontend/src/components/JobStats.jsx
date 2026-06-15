function JobStats({ stats }) {
    if (!stats) {
        return null;
    }

   return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="px-4 py-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.totalApplications}</p>
            </div>

            <div className="px-4 py-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Saved</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.saved}</p>
            </div>

            <div className="px-4 py-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Applied</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.applied}</p>
            </div>

            <div className="px-4 py-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Interview</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.interview}</p>
            </div>

            <div className="px-4 py-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Offer</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.offer}</p>
            </div>

            <div className="px-4 py-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Rejected</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.rejected}</p>
            </div>
        </div>
    </div>
);
}

export default JobStats;