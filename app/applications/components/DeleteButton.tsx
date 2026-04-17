'use client';
import { useRouter } from "next/navigation";
export default function DeleteButton({ applicationId }: { applicationId: string }) {
    const router = useRouter();

    async function handleDelete() {
        try {
            const response = await fetch(`/api/applications/${applicationId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("Application deleted successfully");
                router.refresh();
            } else {
                console.error("Failed to delete application");
            }
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