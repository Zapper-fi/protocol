import React from 'react';
import { BuyCredits } from '@site/src/modules/Dashboard/BuyCredits';
import { Profile } from '@site/src/modules/Dashboard/Profile';
import { PaymentHistory } from '@site/src/modules/Dashboard/PaymentHistory';
import { ConsumptionStats } from '@site/src/modules/Dashboard/ConsumptionStats';
import React, { useState } from 'react';
import { 
  IoHomeOutline, 
  IoStatsChartOutline,
  IoCardOutline,
  IoArrowForward
} from 'react-icons/io5';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: IoHomeOutline },
    { id: 'analytics', label: 'Analytics', icon: IoStatsChartOutline },
    { id: 'credits', label: 'Buy Credits', icon: IoCardOutline }
  ];

  const quickLinks = [
    { label: 'Quickstart', href: '/docs/quickstart' },
    { label: 'API Sandbox', href: '/sandbox' },
    { label: 'LLM Guide', href: '/docs/llm' },
    { label: 'Examples', href: '/docs/examples' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <h1 className="text-2xl font-bold">API Dashboard</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Tab Navigation - Mobile (Top) / Desktop (Side) */}
        <nav className={`
          md:w-64 md:border-r border-gray-800
          overflow-x-auto
          ${activeTab === 'overview' ? 'md:block' : ''}
        `}>
          <div className="flex md:flex-col p-4">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 p-2 rounded
                    whitespace-nowrap
                    min-w-fit
                    md:w-full
                    md:mb-2
                    mr-2
                    md:mr-0
                    ${
                      activeTab === tab.id 
                        ? 'bg-[#A387FF] text-white' 
                        : 'text-gray-400 hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Tab Content */}
        <div className="flex-1 p-4 md:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Profile />

              {/* API Key */}
              <Alert>
                <AlertTitle>Your API Key</AlertTitle>
                <AlertDescription>
                  <code className="bg-gray-800 p-2 rounded block mt-2 overflow-x-auto">
                    f56d9d54-1b7b-4349-9c0f-8ec7e106e28f
                  </code>
                </AlertDescription>
              </Alert>

              {/* Quick Links */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {quickLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 hover:border hover:border-[#A387FF] transition-all"
                    >
                      <span>{link.label}</span>
                      <IoArrowForward className="ml-2" size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <ConsumptionStats />
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="space-y-6">
              <BuyCredits />
              <PaymentHistory />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}