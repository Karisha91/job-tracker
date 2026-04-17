export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Applied</p>
          <p className="text-3xl font-bold mt-2 text-blue-600">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">In interview</p>
          <p className="text-3xl font-bold mt-2 text-yellow-500">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Rejected</p>
          <p className="text-3xl font-bold mt-2 text-red-500">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Offers</p>
          <p className="text-3xl font-bold mt-2 text-green-600">0</p>
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
            <tr>
              <td className="py-3 pr-8 text-gray-500">Google</td>
              <td className="py-3 pr-8 text-gray-500">Junior Developer</td>
              <td className="py-3 pr-8 text-gray-500">APPLIED</td>
              <td className="py-3 pr-8 text-gray-500">2026-04-16</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
