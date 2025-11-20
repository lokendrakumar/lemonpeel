export const metadata = {
  title: 'Dashboard | LemonPeel',
  description: 'Your LemonPeel dashboard with analytics and premium features.',
};

export default function DashboardPage() {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0A0D0F 0%, #181C1F 100%)'
      }}
    >
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 
              className="text-white text-3xl font-bold mb-2"
              style={{
                fontFamily: 'Inter'
              }}
            >
              Welcome to <span style={{ color: '#FAD406' }}>LemonPeel</span>
            </h1>
            <p 
              className="text-gray-400"
              style={{
                fontFamily: 'Inter'
              }}
            >
              Your premium dashboard is ready
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 bg-[#FAD406] text-black rounded-full font-medium hover:bg-[#e8c406] transition-all"
              style={{
                fontFamily: 'Inter'
              }}
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Users', value: '12,543', change: '+12%', color: '#2ECC71' },
            { title: 'Revenue', value: '$48,000', change: '+8%', color: '#FAD406' },
            { title: 'Active Sessions', value: '1,234', change: '+5%', color: '#3498DB' },
            { title: 'Conversion Rate', value: '3.2%', change: '+2%', color: '#E74C3C' }
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-700"
              style={{
                background: 'rgba(24, 28, 31, 0.5)'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span 
                  className="text-gray-400 text-sm"
                  style={{
                    fontFamily: 'Inter'
                  }}
                >
                  {stat.title}
                </span>
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    color: stat.color,
                    background: `${stat.color}20`
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <div 
                className="text-white text-2xl font-bold"
                style={{
                  fontFamily: 'Inter'
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Chart Placeholder */}
          <div 
            className="lg:col-span-2 p-6 rounded-lg border border-gray-700"
            style={{
              background: 'rgba(24, 28, 31, 0.5)'
            }}
          >
            <h3 
              className="text-white text-xl font-semibold mb-4"
              style={{
                fontFamily: 'Inter'
              }}
            >
              Analytics Overview
            </h3>
            <div 
              className="h-64 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(10, 13, 15, 0.5)'
              }}
            >
              <span className="text-gray-500">Chart will be implemented here</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div 
            className="p-6 rounded-lg border border-gray-700"
            style={{
              background: 'rgba(24, 28, 31, 0.5)'
            }}
          >
            <h3 
              className="text-white text-xl font-semibold mb-4"
              style={{
                fontFamily: 'Inter'
              }}
            >
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                'New user registered',
                'Payment processed',
                'Report generated',
                'Data exported',
                'System backup completed'
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: index % 2 === 0 ? '#FAD406' : '#2ECC71'
                    }}
                  />
                  <span 
                    className="text-gray-300 text-sm"
                    style={{
                      fontFamily: 'Inter'
                    }}
                  >
                    {activity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
