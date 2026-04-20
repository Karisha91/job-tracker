
import Link from "next/link"
import { signOut } from "@/auth"
import { auth } from "@/auth";

export default async function Navbar() {
     const session = await auth();
     if (!session?.user?.id) {
        return null;
     }
    return (
        
            <nav className="bg-white shadow mb-8">
    <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex gap-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">
                Dashboard
            </Link>
            <Link href="/applications" className="text-gray-600 hover:text-indigo-600 font-medium">
                Applications
            </Link>
        </div>
        <form action={async () => {
            "use server"
            await signOut({redirectTo: "/login"})
        }}>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Log out
        </button>
        </form>
    </div>
</nav>
    )
       
    }