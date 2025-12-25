"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Button variant="outline" onClick={() => router.replace("/sign-in")}>
          Logout
        </Button>
      </div>

      {/* Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Messages
          </h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">42</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Verified Status
          </h2>
          <p className="mt-2 text-xl font-medium text-green-600">Verified ✅</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Accepting Messages
          </h2>
          <p className="mt-2 text-xl font-medium text-purple-600">Enabled</p>
        </div>
      </div>

      {/* Placeholder Section */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Recent Activity
        </h2>
        <p className="text-gray-600">
          This is a test dashboard page. You can later replace this with real
          user data, charts, messages, or settings.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
