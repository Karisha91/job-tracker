"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Application } from "@prisma/client";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";

type Props = {
  application?: Application;
}

const ADD_APPLICATION = gql `
mutation AddApplication($company_name: String!, $role: String!, $date_applied: String!, $status: Status!, $user_id: String!) {
addApplication(company_name: $company_name, role: $role, date_applied: $date_applied, status: $status, user_id: $user_id ) {
id
company_name
role
date_applied
status
user_id
}
}
`
const UPDATE_APPLICATION = gql `
mutation UpdateApplication($id: ID!, $company_name: String!, $role: String!, $date_applied: String!, $status: Status!, $user_id: String!) {
addApplication(id: $id ,company_name: $company_name, role: $role, date_applied: $date_applied, status: $status, user_id: $user_id ) {
id
company_name
role
date_applied
status
user_id
}
}
`


export default function AddApplicationForm({application}: Props) {

  const router = useRouter();
  const {data: session} = useSession();
  
  const [company, setCompany] = useState(application ? application.company_name : "");
  const [role, setRole] = useState(application ? application.role : "");
  const [status, setStatus] = useState(application ? application.status : "APPLIED");
  const [dateApplied, setDateApplied] = useState(application ? application.date_applied.toISOString().split('T')[0] : "");
  const [error, setError] = useState({text: "", type: ""});

  const [addApplicationMutation, { loading, error: apolloError }] = useMutation(ADD_APPLICATION);
  const [updateApplication] = useMutation(UPDATE_APPLICATION)

  async function handleSubmit() {
    if (application) {
      const response = await fetch(`/api/applications/${application.id}`, {
        method: "PUT",
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
        setError({text: "Application updated successfully!", type: "success"});
        router.refresh();
        router.push("/dashboard");
      } else {
        setError({text: "Failed to update application", type: "error"});
      }
      setTimeout(() => setError({text: "", type: ""}), 3000);
    } else {
      try {
        await addApplicationMutation({
          variables: {
        company_name: company, 
        role,date_applied: dateApplied, 
        status, 
        user_id: session?.user?.id }
      });
    
        setCompany("");
        setRole("");
        setStatus("APPLIED");
        setDateApplied("");
        setError({text: "Application added successfully!", type: "success"});
        router.refresh();
        router.push("/dashboard"); 
      } catch {
        setError({text: "Failed to add application", type: "error"});
      }
      setTimeout(() => setError({text: "", type: ""}), 3000);
    }
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
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value as Application["status"])} className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900">
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <div className="flex gap-2">
          
          
          <button onClick={handleSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
