import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import AddJobForm from "./components/AddJobForm";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import JobStats from "./components/JobStats";


function App() {
    const [jobs, setJobs] = useState([]);
    const [stats, setStats] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
            fetchAllJobs();
            fetchStats();
    }, []);

    
        async function fetchAllJobs() {
            try {
                const response = await fetch("http://localhost:8080/api/v1/jobs");
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }
        async function handleSearchByCompany(companyName) {
            const response = await fetch(
                "http://localhost:8080/api/v1/jobs/search/company?companyName=" + companyName
            );

            const data = await response.json();
            setJobs(data);
        }

        async function handleFilterByStatus(status) {
            const response = await fetch(
                "http://localhost:8080/api/v1/jobs/search/status?status=" + status
            );

            const data = await response.json();
            setJobs(data);
        }
        async function fetchStats() {
            try {
                const response = await fetch("http://localhost:8080/api/v1/jobs/stats");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }
        function handleJobCreated(newJob) {
            setJobs([...jobs, newJob]);
            fetchStats();
        }

        function handleJobDeleted(deletedJobId) {
            setJobs(jobs.filter((job) => job.id !== deletedJobId));
            fetchStats();
        }

        function handleJobUpdated(updatedJob) {
            setJobs(
                jobs.map((job) =>
                    job.id === updatedJob.id ? updatedJob : job
                )
            );
            fetchStats();
        }
    

        return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="mb-10">
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                    Application Dashboard
                </p>

                <h1 className="text-5xl font-bold text-slate-950 mt-2">
                    Job Tracker
                </h1>

                <p className="text-slate-600 mt-3 text-lg">
                    Track your applications, interviews and offers in one place.
                </p>
            </div>

            {/* Stats */}
            <div className="mb-8">
                <JobStats stats={stats} />
            </div>

            {/* Search + Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-8">
                <div className="grid md:grid-cols-[2fr_1fr] gap-4">
                    <SearchBar onSearch={handleSearchByCompany} />
                    <Filter onFilter={handleFilterByStatus} />
                </div>
            </div>

            {/* Add Job */}
            <div className="mb-8">
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-slate-950 text-white px-5 py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
                >
                    {showAddForm ? "Cancel" : "+ Add Application"}
                </button>

                {showAddForm && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-4">
                        <AddJobForm onJobCreated={handleJobCreated} />
                    </div>
                )}
            </div>

            {/* Job List */}
            <div className="space-y-5">
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onJobDeleted={handleJobDeleted}
                        onJobUpdated={handleJobUpdated}
                    />
                ))}
            </div>

        </div>
    </div>
);
}

export default App;