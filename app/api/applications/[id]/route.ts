import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"



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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    const { company, role, status, dateApplied } = await request.json();
    try {
        await prisma.application.update({
            where: {
                id: applicationId,
            },
            data: {
                company_name: company,
                role,
                status,
                date_applied: new Date(dateApplied),
            },
        });
        return NextResponse.json({ message: "Application updated successfully" });
    } catch (error) {
        console.error("Error updating application:", error);
        return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
    }

}