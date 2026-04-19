import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"

export async function POST(request: NextRequest) {
const body = await request.json();
const session = await auth();

if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

const application = await prisma.application.findUnique({
        where: {
            id: body.application_id,
        },    });


        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        if (application.user_id !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}


const note = await prisma.note.create({
    data: {
        content: body.content,
        application_id: body.application_id
    }
});

return NextResponse.json(note);
}