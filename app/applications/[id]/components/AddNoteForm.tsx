"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

type Props = {
    application_id : string
}
export default function AddNoteForm({application_id}: Props) {

    const router = useRouter();

    const [content, setContent] = useState("")

    async function handleSubmit() {
        const response = await fetch(`/api/notes`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                content,
                application_id
            })
        })
        if (response.ok) {
    router.refresh();
    setContent("");
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