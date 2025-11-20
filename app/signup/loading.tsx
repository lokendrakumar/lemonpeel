export default function Loading() {
  return (
    <div 
      className="h-screen w-screen flex items-center justify-center"
      style={{
        background: '#0A0D0F'
      }}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#181C1F] border-t-[#FAD406] animate-spin" />
        <div 
          className="text-white text-sm"
          style={{
            fontFamily: 'Inter',
            fontWeight: '400'
          }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
}

