import AddApplicationForm from "./components/AddApplicationForm";
import { auth } from "../../auth";
import { PrismaClient } from "@prisma/client";
import DeleteButton from "./components/DeleteButton";

const prisma = new PrismaClient();

export default async function ApplicationPage() {
  const session = await auth();
  const applications = await prisma.application.findMany({
    where: {
      user_id: session?.user?.id,
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Applications</h1>
      <AddApplicationForm />
      {applications.length > 0 ? (
        <div className="mt-8 space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded shadow"> 
              <h2 className="text-xl font-bold text-gray-500"  >{app.company_name}</h2> 
              <p className="text-gray-500">{app.role}</p>
              <p className={`text-sm font-semibold ${app.status === "APPLIED" ? "text-blue-500" : app.status === "INTERVIEW" ? "text-yellow-500" : "text-green-500"}`}>
                {app.status}
              </p>
              <p className="text-gray-500">{new Date(app.date_applied).toLocaleDateString()}</p>
              <DeleteButton applicationId={app.id} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No applications found.</p>
      )}
    </div>
  );
}