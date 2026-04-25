'use client';
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";

const DELETE_APPLICATION = gql `
mutation DeleteApplication($id: ID!) {
deleteApplication(id: $id) {
id
company_name
role
date_applied
status
user_id
}
}
`
export default function DeleteButton({ applicationId }: { applicationId: string }) {


    const [deleteApplication] = useMutation(DELETE_APPLICATION);

    const router = useRouter();

    async function handleDelete() {
        try {
            await deleteApplication({variables: {id: applicationId}})
            router.refresh();
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Delete
        </button>
    );
}