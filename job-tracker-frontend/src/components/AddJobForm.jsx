import { useState } from "react";

function AddJobForm({ onJobCreated }) {
    const [formData, setFormData] = useState({
        companyName: "",
        roleTitle: "",
        location: "",
        status: "SAVED",
        applicationDate: "",
        notes: "",
    });

    async function handleSubmit(event) {
    event.preventDefault();

    try {
        const response = await fetch(
            "http://localhost:8080/api/v1/jobs",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();
        onJobCreated(data);

        console.log("Job created:", data);
    } catch (error) {
        console.error("Error creating job:", error);
    }
}

    return (
    <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">
                Add New Application
            </h2>
            <p className="text-slate-500 mt-1">
                Record a new job opportunity and track its progress.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company
                </label>
                <input
                    type="text"
                    placeholder="e.g. Atlassian"
                    value={formData.companyName}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            companyName: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role
                </label>
                <input
                    type="text"
                    placeholder="e.g. Graduate Software Engineer"
                    value={formData.roleTitle}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            roleTitle: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
            </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4">

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                </label>
                <input
                    type="text"
                    placeholder="Perth, WA"
                    value={formData.location}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            location: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date Applied
                </label>
                <input
                    type="date"
                    value={formData.applicationDate}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            applicationDate: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status
                </label>
                <select
                    value={formData.status}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            status: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                >
                    <option value="SAVED">Saved</option>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
                Notes
            </label>
            <textarea
                rows="4"
                placeholder="Add any notes about the application..."
                value={formData.notes}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        notes: e.target.value,
                    })
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
        </div>

        <div className="flex justify-end">
            <button
                type="submit"
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition"
            >
                Save Application
            </button>
        </div>
    </form>
);
}

export default AddJobForm;