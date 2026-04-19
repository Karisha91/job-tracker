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
}
    }

    return (
        <div>
            <textarea name="Content" id="" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <button onClick={handleSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Submit
          </button>

        </div>
    )
}