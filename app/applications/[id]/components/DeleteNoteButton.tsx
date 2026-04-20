'use client';
import { useRouter } from "next/navigation";
export default function DeleteNoteButton({ noteId }: { noteId: string }) {
    const router = useRouter();

    async function handleDelete() {
        try {
            const response = await fetch(`/api/notes/${noteId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("Note deleted successfully");
                router.refresh();
            } else {
                console.error("Failed to delete note");
            }
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