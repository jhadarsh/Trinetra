import React, { useState, useEffect } from "react";

// Enhanced Popup Component with API Integration
const Popup = ({ ghat, isVisible, position, onClose }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fixed image paths - Remove leading slash if using public folder
  const ghatImageFiles = {
    "Ghat 1": "testing1.png",
    "Ghat 2": "testing2.jpg",
    "Ghat 3": "testing3.jpg",
    "Ghat 4": "testing6.jpg",
  };

  const ghatDisplayImages = {
    "Ghat 1":
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    "Ghat 2":
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=200&fit=crop",
    "Ghat 3":
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=400&h=200&fit=crop",
    "Ghat 4":
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
  };

  // Fixed API call function
  const fetchCrowdData = async (ghatName) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`🔍 Fetching data for: ${ghatName}`);

      // Get the image filename
      const imageFileName = ghatImageFiles[ghatName];
      if (!imageFileName) {
        throw new Error(`No image file defined for ghat: ${ghatName}`);
      }

      console.log(`📸 Loading image: ${imageFileName}`);

      // Fetch the image file from public folder
      const imageResponse = await fetch(`/${imageFileName}`);
      if (!imageResponse.ok) {
        throw new Error(
          `Failed to load image: ${imageFileName} (${imageResponse.status})`
        );
      }

      const imageBlob = await imageResponse.blob();
      console.log(
        `✅ Image loaded: ${imageBlob.size} bytes, type: ${imageBlob.type}`
      );

      // Create proper file object
      const imageFile = new File([imageBlob], imageFileName, {
        type: imageBlob.type || "image/jpeg",
      });

      // Create FormData
      const formData = new FormData();
      formData.append("image", imageFile);

      console.log(`🚀 Calling API: http://localhost:3000/predict`);

      // Call your API with proper error handling
      const response = await fetch("http://localhost:3000/predict", {
        method: "POST",
        body: formData,
        // Remove Content-Type header - let browser set it for FormData
      });

      console.log(`📡 API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error Response:`, errorText);
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log(`✅ API Success:`, data);

      if (!data.success) {
        throw new Error(data.error || "API returned success: false");
      }

      setApiData(data);
    } catch (err) {
      console.error("❌ Error in fetchCrowdData:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test function to check if image exists
  const testImageAccess = async (ghatName) => {
    const imageFileName = ghatImageFiles[ghatName];
    try {
      const response = await fetch(`/${imageFileName}`);
      console.log(
        `🧪 Image test for ${imageFileName}:`,
        response.status,
        response.ok
      );
      return response.ok;
    } catch (err) {
      console.log(`🧪 Image test failed for ${imageFileName}:`, err);
      return false;
    }
  };

  // Fetch data when ghat changes
  useEffect(() => {
    if (ghat && isVisible) {
      // Test image access first
      testImageAccess(ghat.name).then((accessible) => {
        if (accessible) {
          fetchCrowdData(ghat.name);
        } else {
          setError(`Image file not found: ${ghatImageFiles[ghat.name]}`);
        }
      });
    }
  }, [ghat, isVisible]);

  const getDensityInfo = (congestionData) => {
    if (!congestionData)
      return {
        label: "Loading...",
        color: "text-gray-600",
        bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
        icon: "⏳",
        border: "border-gray-200",
      };

    const highPercent = congestionData.high_congestion_percent || 0;

    if (highPercent >= 20)
      return {
        label: "Very High",
        color: "text-red-600",
        bgColor: "bg-gradient-to-br from-red-50 to-red-100",
        icon: "🔴",
        border: "border-red-200",
      };
    if (highPercent >= 10)
      return {
        label: "High",
        color: "text-yellow-600",
        bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
        icon: "🟡",
        border: "border-yellow-200",
      };
    if (highPercent >= 5)
      return {
        label: "Medium",
        color: "text-orange-600",
        bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
        icon: "🟠",
        border: "border-orange-200",
      };
    return {
      label: "Low",
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      icon: "🟢",
      border: "border-green-200",
    };
  };

  return (
    <>
      {ghat && isVisible && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Centered Popup */}
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in duration-300 ease-out"
            style={{
              animation: "fadeInScale 0.3s ease-out forwards",
            }}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 w-96 max-h-[90vh] overflow-y-auto border-2 border-orange-200 shadow-2xl relative">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400"></div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md z-10"
              >
                <span className="text-orange-600 font-bold">✕</span>
              </button>

              <div className="text-xl font-bold text-orange-800 text-center mb-4 pr-8">
                🕉️ {ghat.name}
              </div>

              {/* Debug Info */}
              <div className="text-xs text-gray-500 mb-2 p-2 bg-gray-50 rounded">
                📁 Image: {ghatImageFiles[ghat.name]} | 🌐 API: localhost:3000
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-orange-600 font-medium">
                    Analyzing crowd density...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Processing {ghatImageFiles[ghat.name]}
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <p className="text-red-600 text-center font-semibold">
                    ❌ Error
                  </p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                  <div className="mt-3 space-y-2">
                    <button
                      onClick={() => fetchCrowdData(ghat.name)}
                      className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                    >
                      🔄 Retry Analysis
                    </button>
                    <button
                      onClick={() => testImageAccess(ghat.name)}
                      className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
                    >
                      🧪 Test Image Access
                    </button>
                  </div>
                </div>
              )}

              {/* API Data Display */}
              {apiData && !loading && (
                <>
                  {/* Heatmap Image */}
                  <div className="w-full h-48 rounded-xl mb-4 overflow-hidden border-2 border-orange-200 shadow-lg relative">
                    <img
                      src={`data:image/png;base64,${apiData.images.heatmap_overlay}`}
                      alt="Crowd Heatmap"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log("🖼️ Heatmap image failed to load");
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      🎨 AI Generated Heatmap
                    </div>
                  </div>

                  {/* Population Count from API */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 mb-3 text-center border border-blue-200 shadow-sm">
                    <div className="text-sm text-blue-600 mb-1 font-medium">
                      👥 AI Detected Count
                    </div>
                    <div className="text-2xl font-bold text-blue-800">
                      {Math.round(apiData.predicted_count || 0)} People
                    </div>
                  </div>

                  {/* Congestion Analysis from API */}
                  <div
                    className={`${
                      getDensityInfo(apiData.congestion_analysis).bgColor
                    } rounded-xl p-4 text-center border-2 ${
                      getDensityInfo(apiData.congestion_analysis).border
                    } shadow-sm mb-3`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-lg mr-2">
                        {getDensityInfo(apiData.congestion_analysis).icon}
                      </span>
                      <div className="text-sm font-medium opacity-70">
                        Congestion Level
                      </div>
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        getDensityInfo(apiData.congestion_analysis).color
                      }`}
                    >
                      {getDensityInfo(apiData.congestion_analysis).label}
                    </div>

                    {/* Detailed Congestion Breakdown */}
                    {apiData.congestion_analysis && (
                      <div className="mt-3 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="flex items-center">
                            <span className="text-red-500 mr-1">🔴</span>High:
                          </span>
                          <span className="font-bold">
                            {(
                              apiData.congestion_analysis
                                .high_congestion_percent || 0
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center">
                            <span className="text-yellow-500 mr-1">🟡</span>
                            Medium:
                          </span>
                          <span className="font-bold">
                            {(
                              apiData.congestion_analysis
                                .medium_congestion_percent || 0
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center">
                            <span className="text-green-500 mr-1">🟢</span>Low:
                          </span>
                          <span className="font-bold">
                            {(
                              apiData.congestion_analysis
                                .low_congestion_percent || 0
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Density Statistics */}
                  {apiData.density_statistics && (
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 shadow-sm">
                      <div className="text-sm font-medium text-purple-700 mb-2 text-center">
                        📊 Density Statistics
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-purple-600 font-bold">
                            {(
                              apiData.density_statistics.max_density || 0
                            ).toFixed(3)}
                          </div>
                          <div className="text-purple-500">Max Density</div>
                        </div>
                        <div className="text-center">
                          <div className="text-purple-600 font-bold">
                            {(
                              apiData.density_statistics.avg_density || 0
                            ).toFixed(3)}
                          </div>
                          <div className="text-purple-500">Avg Density</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Refresh Button */}
                  <button
                    onClick={() => fetchCrowdData(ghat.name)}
                    className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-98"
                  >
                    🔄 Refresh Analysis
                  </button>
                </>
              )}

              {/* Fallback to original image if no API data */}
              {!apiData && !loading && !error && (
                <div
                  className="w-full h-32 rounded-xl mb-4 bg-cover bg-center border-2 border-orange-200 overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${ghatDisplayImages[ghat.name]})`,
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

// 2D Ghats Component (positioned manually on background)
const Ghats = ({ onGhatClick }) => {
  const [ghatsData, setGhatsData] = useState([
    // Position these manually on your background image
    {
      id: 1,
      name: "Ghat 1",
      population: 45000,
      position: { top: "40%", left: "20%" },
    },
    {
      id: 2,
      name: "Ghat 2",
      population: 85000,
      position: { top: "60%", left: "10%" },
    },
    {
      id: 3,
      name: "Ghat 4",
      population: 35000,
      position: { top: "60%", right: "10%" },
    },
    {
      id: 4,
      name: "Ghat 3",
      population: 95000,
      position: { top: "40%", right: "15%" },
    },
  ]);

  const getDensityColor = (population) => {
    const maxPop = 100000;
    const percentage = (population / maxPop) * 100;

    if (percentage >= 80)
      return "from-red-400/40 to-red-600/40 border-red-500/40 shadow-red-400/30";
    if (percentage >= 60)
      return "from-yellow-400/40 to-yellow-600/40 border-yellow-500/40 shadow-yellow-400/30";
    if (percentage >= 40)
      return "from-orange-400/40 to-orange-600/40 border-orange-500/40 shadow-orange-400/30";
    return "from-green-400/40 to-green-600/40 border-green-500/40 shadow-green-400/30";
  };

  const updatePopulation = () => {
    setGhatsData((prevGhats) =>
      prevGhats.map((ghat) => {
        const variation = Math.floor(Math.random() * 4000) - 2000;
        const newPop = Math.max(
          15000,
          Math.min(100000, ghat.population + variation)
        );
        return { ...ghat, population: newPop };
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(updatePopulation, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {ghatsData.map((ghat, index) => (
        <div
          key={ghat.id}
          className={`absolute w-32 h-12 rounded-xl cursor-pointer border-2 flex items-center justify-center text-white font-bold text-sm shadow-xl bg-gradient-to-r ${getDensityColor(
            ghat.population
          )} hover:scale-110 transition-all duration-300 backdrop-blur-sm animate-in`}
          style={{
            ...ghat.position,
            animationDelay: `${0.5 + index * 0.2}s`,
            animationDuration: "0.6s",
            animationFillMode: "both",
            animation: `fadeInScale 0.6s ease-out ${0.5 + index * 0.2}s both`,
          }}
          onClick={() => onGhatClick(ghat)}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1) translateY(-5px)";
            e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
          }}
        >
          <div className="text-center leading-tight">
            <div className="text-xs font-bold">{ghat.name}</div>
          </div>

          {/* Pulse animation for high density */}
          {ghat.population > 70000 && (
            <div
              className="absolute inset-0 rounded-xl border-2 border-white/50 animate-pulse"
              style={{
                animation: "pulseGlow 2s infinite",
              }}
            />
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Main Dashboard Component
const MainDashboard = () => {
  const [selectedGhat, setSelectedGhat] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleGhatClick = (ghat) => {
    setSelectedGhat(ghat);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setTimeout(() => setSelectedGhat(null), 300);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image - Replace with your image from public folder */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/Dashboard.png')",
          backgroundColor: "#FAE7E0", // Fallback color
        }}
      >
        {/* Overlay for better visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Live Indicator */}
      <div
        className="absolute  top-6 right-6 flex items-center text-white font-bold z-20 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shadow-lg animate-in"
        style={{
          animation: "fadeInScale 0.6s ease-out 1s both",
        }}
      >
        <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" />
        <span className="text-sm">LIVE</span>
      </div>

      {/* Ghats positioned on background */}
      <Ghats onGhatClick={handleGhatClick} />

      {/* Popup for selected ghat */}
      <Popup
        ghat={selectedGhat}
        isVisible={showPopup}
        onClose={handleClosePopup}
      />

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MainDashboard;
