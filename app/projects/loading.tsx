export default function ProjectsLoading() {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0A0D0F 0%, #181C1F 100%)'
      }}
    >
      <div className="container mx-auto px-6 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-700 rounded-full animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-700"
              style={{
                background: 'rgba(24, 28, 31, 0.5)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-6 w-6 bg-gray-600 rounded animate-pulse" />
                <div className="h-3 w-3 bg-gray-600 rounded-full animate-pulse" />
              </div>
              <div className="h-8 w-12 bg-gray-600 rounded animate-pulse mb-1" />
              <div className="h-4 w-20 bg-gray-600 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-700"
              style={{
                background: 'rgba(24, 28, 31, 0.5)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-16 bg-gray-600 rounded-full animate-pulse" />
                <div className="h-4 w-8 bg-gray-600 rounded animate-pulse" />
              </div>
              <div className="h-6 w-full bg-gray-600 rounded animate-pulse mb-3" />
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-16 bg-gray-600 rounded animate-pulse" />
                  <div className="h-4 w-8 bg-gray-600 rounded animate-pulse" />
                </div>
                <div className="h-2 w-full bg-gray-700 rounded-full">
                  <div className="h-2 bg-gray-600 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-16 bg-gray-600 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-600 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Activity Skeleton */}
        <div 
          className="p-6 rounded-lg border border-gray-700"
          style={{
            background: 'rgba(24, 28, 31, 0.5)'
          }}
        >
          <div className="h-6 w-40 bg-gray-600 rounded animate-pulse mb-6" />
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-3">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-full bg-gray-600 rounded animate-pulse mb-2" />
                  <div className="h-3 w-32 bg-gray-600 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
