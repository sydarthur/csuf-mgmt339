const VideoSummary = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Listening to Your Process</h1>
        <p className="text-gray-600 mb-6">A comprehensive video guide to Statistical Process Control</p>

        {/* Video Container */}
        <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
          <video
            controls
            className="absolute top-0 left-0 w-full h-full"
            preload="metadata"
          >
            <source src="/assets/Listening_to_Your_Process.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Optional: Video Description */}
        <div className="mt-6 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
          <h3 className="font-bold text-lg text-blue-900 mb-2">About This Video</h3>
          <p className="text-gray-700">
            This video provides a comprehensive overview of Statistical Process Control concepts,
            helping you understand how to monitor and improve your processes using control charts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSummary;
