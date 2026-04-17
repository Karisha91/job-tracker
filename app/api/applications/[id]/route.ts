import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth"

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const applicationId = (await params).id;
    const application = await prisma.application.findUnique({
        where: {
            id: applicationId,
        },    });
        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }
    if (application.user_id !== session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await prisma.application.delete({
            where: {
                id: applicationId,
            },
        });
        return NextResponse.json({ message: "Application deleted successfully" });
    } catch (error) {
        console.error("Error deleting application:", error);
        return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });

    }

}