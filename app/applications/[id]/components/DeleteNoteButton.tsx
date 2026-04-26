'use client';
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";


const DELETE_NOTE = gql `
mutation DeleteNote($id: ID!) {
deleteNote(id: $id) {
id
content
created_at
application_id
}
}
`
export default function DeleteNoteButton({ noteId }: { noteId: string }) {

    const [deleteNote] = useMutation(DELETE_NOTE)

    const router = useRouter();

    async function handleDelete() {
        try {
            await deleteNote({
                variables: {
                    id: noteId
                }
            })
            router.refresh()
        } catch (error) {
            console.error("Error deleting note:", error);
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