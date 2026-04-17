"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddApplicationForm() {
    const router = useRouter();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [dateApplied, setDateApplied] = useState("");
  const [error, setError] = useState({text: "", type: ""});

  async function handleSubmit() {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        role,
        status,
        dateApplied,
      }),
    });
    if (response.ok) {
      setCompany("");
      setRole("");
      setStatus("APPLIED");
      setDateApplied("");
      setError({text: "Application added successfully!", type: "success"});
      router.refresh();
    } else {
      setError({text: "Failed to add application", type: "error"});
    }
    setTimeout(() => setError({text: "", type: ""}), 3000);
  }

  return (
    
      <div>
      {error && <p className={`mb-4 ${error.type === "error" ? "text-red-500" : "text-green-500"}`}>{error.text}</p>}
      <div className="space-y-4">

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400"
        />
        <input
          type="date"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <div className="flex gap-2">
          
          
          <button onClick={handleSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Add Application
          </button>
        </div>
      </div>
    </div>
  );
}
