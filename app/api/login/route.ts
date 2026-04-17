import { signIn } from "@/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    try {
        await signIn("credentials", {
            redirect: false,
            email,
            password
        });
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
}