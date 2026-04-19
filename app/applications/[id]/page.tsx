
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"
import { error } from "console";
import AddNoteForm from "./components/AddNoteForm";


export default async function ApplicationPage({ params }: { params: Promise<{ id: string }>}) {
    
    
    const applicationId = (await params).id
    const application = await prisma.application.findUnique({
        where: {
            id: applicationId
        }
    })

    const notes = await prisma.note.findMany({
        where: {
            application_id: applicationId
        }
    })
    
    






    return (
        <div>
            <h1>Application</h1>
            <AddNoteForm application_id={applicationId} />
            <div>
                {application?.company_name}
            </div>
            {notes.map((app)=>(
                <div key={app.id}>
                    {app.content}
                </div>
            ))}
        </div>
    )
}