import { useState } from "react";

function JobCard({ job, onJobDeleted, onJobUpdated }) {
    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({
        companyName: job.companyName,
        roleTitle: job.roleTitle,
        location: job.location,
        status: job.status,
        applicationDate: job.applicationDate,
        notes: job.notes || "",
    });

    async function handleDelete() {
        try {
            await fetch("http://localhost:8080/api/v1/jobs/" + job.id, {
                method: "DELETE",
            });

            onJobDeleted(job.id);
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    }

    async function handleUpdate(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/jobs/" + job.id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editData),
                }
            );

            const updatedJob = await response.json();

            onJobUpdated(updatedJob);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating job:", error);
        }
    }


    if (isEditing) {
        return (
            <form onSubmit={handleUpdate} className="border rounded-lg p-4 shadow-md mb-4">
                <input
                    type="text"
                    value={editData.companyName}
                    onChange={(e) =>
                        setEditData({ ...editData, companyName: e.target.value })
                    }
                    className="border p-2 mb-3 w-full"
                />

                <input
                    type="text"
                    value={editData.roleTitle}
                    onChange={(e) =>
                        setEditData({ ...editData, roleTitle: e.target.value })
                    }
                    className="border p-2 mb-3 w-full"
                />

                <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                    }
                    className="border p-2 mb-3 w-full"
                />

                <input
                    type="date"
                    value={editData.applicationDate}
                    onChange={(e) =>
                        setEditData({ ...editData, applicationDate: e.target.value })
                    }
                    className="border p-2 mb-3 w-full"
                />

                <select
                    value={editData.status}
                    onChange={(e) =>
                        setEditData({ ...editData, status: e.target.value })
                    }
                    className="border p-2 mb-3 w-full"
                >
                    <option value="SAVED">Saved</option>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                </select>

                <textarea
                    value={editData.notes}
                    onChange={(e) =>
                        setEditData({ ...editData, notes: e.target.value })
                    }
                    className="border p-2 mb-3 w-full"
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Save
                </button>

                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                    Cancel
                </button>
            </form>
        );
    }
    function formatStatus(status) {
        switch (status) {
            case "OFFER":
                return "Offer";

            case "INTERVIEW":
                return "Interview";

            case "APPLIED":
                return "Applied";

            case "REJECTED":
                return "Rejected";

            case "SAVED":
                return "Saved";

            default:
                return status;
        }
    }
    function getStatusStyles(status) {
    switch (status) {
        case "OFFER":
            return "bg-green-100 text-green-700 border border-green-200";

        case "INTERVIEW":
            return "bg-blue-100 text-blue-700 border border-blue-200";

        case "APPLIED":
            return "bg-purple-100 text-purple-700 border border-purple-200";

        case "REJECTED":
            return "bg-red-100 text-red-700 border border-red-200";

        case "SAVED":
            return "bg-slate-100 text-slate-700 border border-slate-200";

        default:
            return "bg-gray-100 text-gray-700 border border-gray-200";
    }
}

    return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
        <div className="flex justify-between items-start">

            <div>
                <h3 className="text-2xl font-bold text-slate-900">
                    {job.companyName}
                </h3>

                <p className="text-slate-600 text-lg mt-1">
                    {job.roleTitle}
                </p>

                {job.location && (
                    <p className="text-sm text-slate-400 mt-1">
                        📍 {job.location}
                    </p>
                )}
            </div>

            <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyles(
                    job.status
                )}`}
            >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                {job.status}
            </span>

        </div>

        <div className="flex gap-3 mt-6">

            <button
                onClick={() => setIsEditing(true)}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
            >
                Edit
            </button>

            <button
                onClick={handleDelete}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
                Delete
            </button>

        </div>
    </div>
);
}

export default JobCard;