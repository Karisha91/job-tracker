import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const noteId = (await params).id;
    const note = await prisma.note.findUnique({
        where: {
            id: noteId,
        },
    })
    if (!note) {
        return NextResponse.json({error: "Note not found"}, {status: 401})
    }
    const application = await prisma.application.findUnique({
        where: {
            id: note?.application_id
        },    });
    
    
    if (application?.user_id !== session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await prisma.note.delete({
            where: {
                id: noteId,
            }
        })
        return NextResponse.json({ message: "Note deleted successfully" });
    } catch(error) {
        return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
    }
}