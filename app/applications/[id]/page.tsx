import { prisma } from "@/lib/prisma";
import AddNoteForm from "./components/AddNoteForm";
import DeleteNoteButton from "./components/DeleteNoteButton";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const applicationId = (await params).id;
  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  const notes = await prisma.note.findMany({
    where: {
      application_id: applicationId,
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">
        Application Details
      </h1>
      {/* Header card */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-700">
          {application?.company_name}
        </h2>
        <p className="text-gray-500 mt-1">{application?.role}</p>
        <div className="flex gap-4 mt-4">
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              application?.status === "APPLIED"
                ? "bg-blue-100 text-blue-600"
                : application?.status === "INTERVIEW"
                  ? "bg-yellow-100 text-yellow-600"
                  : application?.status === "OFFER"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
            }`}
          >
            {application?.status}
          </span>
          <span className="text-sm text-gray-400">
            {application?.date_applied
              ? new Date(application.date_applied).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>
      {/* Notes section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-500 mb-4">Notes</h2>
        <AddNoteForm application_id={applicationId} />
        <div className="mt-6 space-y-3">
            {notes.map((note) => (
                <div key={note.id} className="border border-gray-200 rounded p-4">
                    <p className="text-gray-600">{note.content}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(note.created_at).toLocaleDateString()}

                        </p>
                        <DeleteNoteButton noteId={note.id}/> 

                </div>
            ))}

        </div>
      </div>
    </div>
  );
}
