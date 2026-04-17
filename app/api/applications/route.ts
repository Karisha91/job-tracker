import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth"

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const application = await prisma.application.create({
        data: {
            company_name: body.company,
            role: body.role,
            date_applied: new Date(body.dateApplied),
            status: body.status,
            user_id: session.user.id
        },
    });
    return NextResponse.json(application);
}