import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DeleteButton from "../applications/components/DeleteButton";
import Link from "next/link";


export default async function DashboardPage() {
  const session = await auth();

  const applications = await prisma.application.findMany({
    where: {
      user_id: session?.user?.id,
    },
    orderBy: {
      date_applied: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Applied</p>
          <p className="text-3xl font-bold mt-2 text-blue-600">
            {applications.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">In interview</p>
          <p className="text-3xl font-bold mt-2 text-yellow-500">
            {applications.filter((app) => app.status === "INTERVIEW").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Rejected</p>
          <p className="text-3xl font-bold mt-2 text-red-500">
            {applications.filter((app) => app.status === "REJECTED").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Offers</p>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {applications.filter((app) => app.status === "OFFER").length}
          </p>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-500">
          Recent Applications
        </h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-gray-500 pb-3 pr-8">Company</th>
              <th className="text-left text-gray-500 pb-3 pr-8">Position</th>
              <th className="text-left text-gray-500 pb-3 pr-8">Status</th>
              <th className="text-left text-gray-500 pb-3 pr-8">Applied On</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-3 text-gray-500 text-center">
                  No applications found. Start applying!
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id}>
                  <td className="py-3 pr-8 text-gray-500">
                    {app.company_name}
                  </td>
                  <td className="py-3 pr-8 text-gray-500">{app.role}</td>
                  <td className="py-3 pr-8 text-gray-500">{app.status}</td>
                  <td className="py-3 pr-8 text-gray-500">
                    {new Date(app.date_applied).toLocaleDateString()}
                  </td>
                  <td className="py-3 pr-8">
                    <div className="flex gap-2">
                      <DeleteButton applicationId={app.id} />
                      <Link href={`/applications?edit=${app.id}`}>
                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
