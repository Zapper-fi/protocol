import React, { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'billing', label: 'Billing' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'settings', label: 'Settings' }
  ];

  const quickActions = [
    { label: 'Quickstart' },
    { label: 'Sandbox' },
    { label: 'Use with LLMs' },
    { label: 'Examples' }
  ];

  return (
    <div className="min-h-screen bg-[#0C1013] text-[#FFFFFF] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">API Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-[#32383D]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 space-x-2 ${
              activeTab === tab.id
                ? 'border-b-2 border-[#A387FF] text-[#A387FF]'
                : 'text-[#C7D2DA]'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* API Key Section */}
            <div className="bg-[#252A2E] p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">API Key</h2>
              <div className="flex items-center space-x-2">
                <code className="bg-[#32383D] p-2 rounded flex-1">
                  f56d9d54-1b7b-4349-9c0f-8ec7e106e28f
                </code>
                <button className="p-2 bg-[#A387FF] rounded">
                  Copy
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {quickActions.map(action => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center p-4 bg-[#252A2E] rounded-lg hover:bg-[#32383D]"
                  >
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Usage Summary */}
            <div className="bg-[#252A2E] p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Usage Summary</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-[#32383D] p-4 rounded">
                  <div className="text-sm text-[#C7D2DA]">Credits Remaining</div>
                  <div className="text-2xl font-bold">9,697</div>
                </div>
                <div className="bg-[#32383D] p-4 rounded">
                  <div className="text-sm text-[#C7D2DA]">Requests Today</div>
                  <div className="text-2xl font-bold">245</div>
                </div>
                <div className="bg-[#32383D] p-4 rounded">
                  <div className="text-sm text-[#C7D2DA]">Cost Today</div>
                  <div className="text-2xl font-bold">$3.24</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-[#252A2E] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Analytics Content</h2>
            {/* Add your existing charts here */}
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="bg-[#252A2E] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Billing Content</h2>
            {/* Add your existing billing content here */}
          </div>
        )}

        {activeTab === 'documentation' && (
          <div className="space-y-4">
            <div className="bg-[#252A2E] p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Getting Started</h2>
              {/* Add documentation content */}
            </div>
            <div className="bg-[#252A2E] p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Example Queries</h2>
              {/* Add example queries */}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-[#252A2E] p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Settings</h2>
            {/* Add settings content */}
          </div>
        )}
      </div>
    </div>
  );
}