"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";


const ADD_NOTE = gql `
mutation AddNote($content: String!, $application_id: String!) {
addNote(content: $content, application_id: $application_id) {
id
content
created_at
application_id
}
}
`

type Props = {
    application_id : string
}
export default function AddNoteForm({application_id}: Props) {

    const router = useRouter();

    const [content, setContent] = useState("")

    const [addNote , {loading, error}] = useMutation(ADD_NOTE)

    async function handleSubmit() {
        try {
            await addNote({
                variables: {
                    content: content,
                    application_id: application_id
                }
            })
            router.refresh();
            setContent("");
        } catch(e) {
            console.error("Failed to add note", e)
        }
    

    }

    return (
    <div className="mb-6">
        <textarea 
            placeholder="Add a note..."
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 resize-none h-24"
        />
        <button 
            onClick={handleSubmit} 
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
            Add Note
        </button>
    </div>
)
}