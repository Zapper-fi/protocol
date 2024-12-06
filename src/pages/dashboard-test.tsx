export default function DashboardMockup() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">API Dashboard</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Tab Navigation */}
        <nav className="md:w-64 md:border-r p-4">
          <div className="flex md:flex-col">
            <button className="p-2 rounded md:w-full md:mb-2 mr-2 md:mr-0 bg-black text-white">
              Overview
            </button>
            <button className="p-2 rounded md:w-full md:mb-2 mr-2 md:mr-0 hover:bg-gray-700">
              Analytics
            </button>
            <button className="p-2 rounded md:w-full md:mb-2 mr-2 md:mr-0 hover:bg-gray-700">
              Buy Credits
            </button>
          </div>
        </nav>
        {/* Tab Content Area */}
        <div className="flex-1 p-4">
          {/* Overview Tab Content */}
          <div className="space-y-6">
            {/* API Key Section */}
            <div className="border rounded p-4">
              <div className="font-bold mb-2">Your API Key</div>
              <code className="bg-gray-800 p-2 rounded block mt-2">
                f56d9d54-1b7b-4349-9c0f-8ec7e106e28f
              </code>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-800 py-4">
              <div className="container mx-auto flex justify-center space-x-4">
                <a href="#" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700">
                  Quickstart
                </a>
                <a href="#" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                  Use with Agents & LLMs
                </a>
                <a href="#" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                  Pricing
                </a>
                <a href="#" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                  Sandbox
                </a>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded p-4">
                <div className="text-sm text-gray-400">Credits Remaining</div>
                <div className="text-xl font-bold">9,697</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm text-gray-400">Requests Today</div>
                <div className="text-xl font-bold">245</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm text-gray-400">Cost Today</div>
                <div className="text-xl font-bold">$0.25</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}