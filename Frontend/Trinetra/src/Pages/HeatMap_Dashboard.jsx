import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced River Component
const River = () => {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 2;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.4));
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
      `;
      
      const riverContainer = document.querySelector('.river-container');
      if (riverContainer) {
        particle.style.left = `${20 + Math.random() * 80}px`;
        particle.style.top = `${window.innerHeight}px`;
        
        riverContainer.appendChild(particle);
        
        particle.animate([
          { 
            transform: 'translateY(0px)', 
            opacity: 0.8
          },
          { 
            transform: `translateY(-${window.innerHeight + 100}px)`, 
            opacity: 0
          }
        ], {
          duration: 8000 + Math.random() * 4000,
          easing: 'ease-out'
        }).onfinish = () => particle.remove();
      }
    };

    const particleInterval = setInterval(createParticle, 300);
    
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <motion.div 
      className="river-container absolute w-32 h-full overflow-hidden"
      style={{ left: '42%' }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Main river body */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(180deg, #dbeafe 0%, #bfdbfe 20%, #93c5fd 40%, #60a5fa 70%, #3b82f6 100%)',
        }}
      />
      
      {/* Animated water waves */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{ 
          backgroundPosition: ['0% 0%', '0% -100%'],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent 0px,
            rgba(255, 255, 255, 0.4) 15px,
            transparent 30px,
            rgba(255, 255, 255, 0.2) 45px,
            transparent 60px
          )`,
          borderRadius: '50px'
        }}
      />
      
      {/* Surface ripples */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-8 h-2 bg-white/20 rounded-full transform -translate-x-1/2"
        animate={{ 
          scaleX: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/3 w-6 h-1 bg-white/15 rounded-full"
        animate={{ 
          scaleX: [1, 2, 1],
          opacity: [0.1, 0.4, 0.1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
};

// // Enhanced Popup Component - Now opens on the side, not center
// const Popup = ({ ghat, isVisible, position, onClose }) => {
//   const ghatImages = {
//     'Har Ki Pauri': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
//     'Dashashwamedh': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=200&fit=crop',
//     'Manikarnika': 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=400&h=200&fit=crop',
//     'Assi Ghat': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop'
//   };

//   const getDensityInfo = (population) => {
//     const maxPop = 100000;
//     const percentage = Math.round((population / maxPop) * 100);
    
//     if (percentage >= 80) return { 
//       label: 'Very High', 
//       color: 'text-red-600', 
//       bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
//       icon: '🔴',
//       border: 'border-red-200'
//     };
//     if (percentage >= 60) return { 
//       label: 'High', 
//       color: 'text-yellow-600', 
//       bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
//       icon: '🟡',
//       border: 'border-yellow-200'
//     };
//     if (percentage >= 40) return { 
//       label: 'Medium', 
//       color: 'text-orange-600', 
//       bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
//       icon: '🟠',
//       border: 'border-orange-200'
//     };
//     return { 
//       label: 'Low', 
//       color: 'text-green-600', 
//       bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
//       icon: '🟢',
//       border: 'border-green-200'
//     };
//   };

//   // Determine popup position based on ghat location
//   const getPopupPosition = () => {
//     if (!ghat) return {};
    
//     // If ghat is on left side of river, show popup on left
//     if (ghat.side === 'left') {
//       return {
//         top: '10%',
//         left: '40%',
//         transform: 'none'
//       };
//     } else {
//       // If ghat is on right side, show popup on right
//       return {
//         top: '10%',
//         right: '40%',
//         transform: 'none'
//       };
//     }
//   };

//   return (
//     <AnimatePresence>
//       {ghat && isVisible && (
//         <>
//           {/* Backdrop */}
//           <motion.div 
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />
          
//           {/* Popup - Now positioned on sides */}
//           <motion.div 
//             className="fixed z-50"
//             style={getPopupPosition()}
//             initial={{ 
//               opacity: 0, 
//               scale: 0.7, 
//               x: ghat?.side === 'left' ? -100 : 100 
//             }}
//             animate={{ 
//               opacity: 1, 
//               scale: 1, 
//               x: 0 
//             }}
//             exit={{ 
//               opacity: 0, 
//               scale: 0.7, 
//               x: ghat?.side === 'left' ? -100 : 100 
//             }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//           >
//             <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 w-80 border-2 border-orange-200 shadow-2xl relative overflow-hidden">
//               {/* Decorative elements */}
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400"></div>
              
//               {/* Close button */}
//               <button 
//                 onClick={onClose}
//                 className="absolute top-4 right-4 w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
//               >
//                 <span className="text-orange-600 font-bold">✕</span>
//               </button>
              
//               <motion.div 
//                 className="text-xl font-bold text-orange-800 text-center mb-4 pr-8"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 🕉️ {ghat.name}
//               </motion.div>
              
//               <motion.div 
//                 className="w-full h-32 rounded-xl mb-4 bg-cover bg-center border-2 border-orange-200 overflow-hidden shadow-lg"
//                 style={{ backgroundImage: `url(${ghatImages[ghat.name]})` }}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.2 }}
//               />
              
//               {/* Population Count */}
//               <motion.div 
//                 className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 mb-3 text-center border border-blue-200 shadow-sm"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <div className="text-sm text-blue-600 mb-1 font-medium">👥 Current Pilgrims</div>
//                 <div className="text-2xl font-bold text-blue-800">
//                   {parseInt(ghat.population).toLocaleString()}
//                 </div>
//               </motion.div>
              
//               {/* Enhanced Density Info */}
//               <motion.div 
//                 className={`${getDensityInfo(ghat.population).bgColor} rounded-xl p-4 text-center border-2 ${getDensityInfo(ghat.population).border} shadow-sm`}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <div className="flex items-center justify-center mb-2">
//                   <span className="text-lg mr-2">{getDensityInfo(ghat.population).icon}</span>
//                   <div className="text-sm font-medium opacity-70">Population Density</div>
//                 </div>
//                 <div className={`text-lg font-bold ${getDensityInfo(ghat.population).color}`}>
//                   {getDensityInfo(ghat.population).label}
//                 </div>
//                 <div className="text-sm opacity-60 mt-2 font-medium">
//                   {Math.round((ghat.population / 100000) * 100)}% Capacity
//                 </div>
                
//                 {/* Progress bar */}
//                 <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//                   <motion.div 
//                     className={`h-2 rounded-full ${
//                       getDensityInfo(ghat.population).label === 'Very High' ? 'bg-red-500' :
//                       getDensityInfo(ghat.population).label === 'High' ? 'bg-yellow-500' :
//                       getDensityInfo(ghat.population).label === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
//                     }`}
//                     initial={{ width: 0 }}
//                     animate={{ width: `${Math.round((ghat.population / 100000) * 100)}%` }}
//                     transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
//                   />
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Enhanced Ghats Component - 2 on left, 2 on right
// const Ghats = ({ onGhatClick }) => {
//   const [ghatsData, setGhatsData] = useState([
//     // Left side ghats
//     { id: 1, name: "Har Ki Pauri", population: 45000, side: "left", position: { top: "20%", left: "8%" } },
//     { id: 2, name: "Dashashwamedh", population: 85000, side: "left", position: { top: "60%", left: "12%" } },
//     // Right side ghats
//     { id: 3, name: "Assi Ghat", population: 35000, side: "right", position: { top: "25%", right: "6%" } },
//     { id: 4, name: "Manikarnika", population: 95000, side: "right", position: { top: "65%", right: "10%" } }
//   ]);

//   const getDensityColor = (population) => {
//     const maxPop = 100000;
//     const percentage = (population / maxPop) * 100;

//     if (percentage >= 80)
//       return "from-red-200 via-red-300 to-red-400 border-red-400 shadow-red-300/60";
//     if (percentage >= 60)
//       return "from-yellow-200 via-yellow-300 to-yellow-400 border-yellow-400 shadow-yellow-300/60";
//     if (percentage >= 40)
//       return "from-orange-200 via-orange-300 to-orange-400 border-orange-400 shadow-orange-300/60";
//     return "from-green-200 via-green-300 to-green-400 border-green-400 shadow-green-300/60";
//   };

//   const updatePopulation = () => {
//     setGhatsData((prevGhats) =>
//       prevGhats.map((ghat) => {
//         const variation = Math.floor(Math.random() * 4000) - 2000;
//         const newPop = Math.max(15000, Math.min(100000, ghat.population + variation));
//         return { ...ghat, population: newPop };
//       })
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(updatePopulation, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-full">
//       {ghatsData.map((ghat, index) => (
//         <motion.div
//           key={ghat.id}
//           className={`absolute w-40 h-18 rounded-2xl cursor-pointer border-2 flex flex-col items-center justify-center text-orange-900 font-bold text-xs shadow-xl backdrop-blur-sm bg-gradient-to-r ${getDensityColor(
//             ghat.population
//           )} hover:scale-110 transition-all duration-300`}
//           style={ghat.position}
//           initial={{ opacity: 0, scale: 0, rotate: ghat.side === 'left' ? -180 : 180 }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//             rotate: 0,
//             boxShadow:
//               ghat.population > 70000
//                 ? [
//                     "0 8px 25px rgba(0,0,0,0.15)",
//                     "0 15px 35px rgba(251, 146, 60, 0.4)",
//                     "0 8px 25px rgba(0,0,0,0.15)"
//                   ]
//                 : "0 8px 25px rgba(0,0,0,0.15)"
//           }}
//           transition={{
//             opacity: { delay: 0.5 + index * 0.2, duration: 0.6 },
//             scale: { delay: 0.5 + index * 0.2, duration: 0.6, type: "spring", stiffness: 120 },
//             rotate: { delay: 0.5 + index * 0.2, duration: 0.8 },
//             boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
//           }}
//           whileHover={{
//             y: -10,
//             boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
//             transition: { duration: 0.3 }
//           }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => onGhatClick(ghat)}
//         >
//           <div className="text-center leading-tight p-2">
//             <div className="text-sm">{ghat.name}</div>
//             <div className="text-[10px] opacity-80 mt-1 bg-white/30 px-2 py-1 rounded-full">
//               {(ghat.population / 1000).toFixed(0)}K pilgrims
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// Enhanced Popup Component with API Integration
const Popup = ({ ghat, isVisible, position, onClose }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fixed image paths - Remove leading slash if using public folder
  const ghatImageFiles = {
    "Har Ki Pauri": "testing1.png",
    "Dashashwamedh": "testing2.jpg", 
    "Manikarnika": "testing3.jpg",
    "Assi Ghat": "testing6.jpg",
  };

  const ghatDisplayImages = {
    'Har Ki Pauri': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
    'Dashashwamedh': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=200&fit=crop',
    'Manikarnika': 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=400&h=200&fit=crop',
    'Assi Ghat': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop'
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
        throw new Error(`Failed to load image: ${imageFileName} (${imageResponse.status})`);
      }

      const imageBlob = await imageResponse.blob();
      console.log(`✅ Image loaded: ${imageBlob.size} bytes, type: ${imageBlob.type}`);

      // Create proper file object
      const imageFile = new File([imageBlob], imageFileName, { 
        type: imageBlob.type || 'image/jpeg' 
      });

      // Create FormData
      const formData = new FormData();
      formData.append('image', imageFile);

      console.log(`🚀 Calling API: http://localhost:5000/predict`);

      // Call your API with proper error handling
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
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
        throw new Error(data.error || 'API returned success: false');
      }

      setApiData(data);
      
    } catch (err) {
      console.error('❌ Error in fetchCrowdData:', err);
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
      console.log(`🧪 Image test for ${imageFileName}:`, response.status, response.ok);
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
      testImageAccess(ghat.name).then(accessible => {
        if (accessible) {
          fetchCrowdData(ghat.name);
        } else {
          setError(`Image file not found: ${ghatImageFiles[ghat.name]}`);
        }
      });
    }
  }, [ghat, isVisible]);

  const getDensityInfo = (congestionData) => {
    if (!congestionData) return { 
      label: 'Loading...', 
      color: 'text-gray-600', 
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      icon: '⏳',
      border: 'border-gray-200'
    };

    const highPercent = congestionData.high_congestion_percent || 0;
    
    if (highPercent >= 20) return { 
      label: 'Very High', 
      color: 'text-red-600', 
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      icon: '🔴',
      border: 'border-red-200'
    };
    if (highPercent >= 10) return { 
      label: 'High', 
      color: 'text-yellow-600', 
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      icon: '🟡',
      border: 'border-yellow-200'
    };
    if (highPercent >= 5) return { 
      label: 'Medium', 
      color: 'text-orange-600', 
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      icon: '🟠',
      border: 'border-orange-200'
    };
    return { 
      label: 'Low', 
      color: 'text-green-600', 
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      icon: '🟢',
      border: 'border-green-200'
    };
  };

  // Determine popup position based on ghat location
  const getPopupPosition = () => {
    if (!ghat) return {};
    
    if (ghat.side === 'left') {
      return {
        top: '5%',
        left: '5%',
        transform: 'none'
      };
    } else {
      return {
        top: '5%',
        right: '5%',
        transform: 'none'
      };
    }
  };

  return (
    <AnimatePresence>
      {ghat && isVisible && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Enhanced Popup with API Data */}
          <motion.div 
            className="fixed z-50"
            style={getPopupPosition()}
            initial={{ 
              opacity: 0, 
              scale: 0.7, 
              x: ghat?.side === 'left' ? -100 : 100 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.7, 
              x: ghat?.side === 'left' ? -100 : 100 
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
              
              <motion.div 
                className="text-xl font-bold text-orange-800 text-center mb-4 pr-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                🕉️ {ghat.name}
              </motion.div>

              {/* Debug Info */}
              <div className="text-xs text-gray-500 mb-2 p-2 bg-gray-50 rounded">
                📁 Image: {ghatImageFiles[ghat.name]} | 🌐 API: localhost:5000
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-orange-600 font-medium">Analyzing crowd density...</p>
                  <p className="text-sm text-gray-500 mt-2">Processing {ghatImageFiles[ghat.name]}</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <p className="text-red-600 text-center font-semibold">❌ Error</p>
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
                  <motion.div 
                    className="w-full h-48 rounded-xl mb-4 overflow-hidden border-2 border-orange-200 shadow-lg relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img 
                      src={`data:image/png;base64,${apiData.images.heatmap_overlay}`}
                      alt="Crowd Heatmap"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('🖼️ Heatmap image failed to load');
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      🎨 AI Generated Heatmap
                    </div>
                  </motion.div>

                  {/* Population Count from API */}
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 mb-3 text-center border border-blue-200 shadow-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-sm text-blue-600 mb-1 font-medium">👥 AI Detected Count</div>
                    <div className="text-2xl font-bold text-blue-800">
                      {Math.round(apiData.predicted_count || 0)} People
                    </div>
                  </motion.div>

                  {/* Congestion Analysis from API */}
                  <motion.div 
                    className={`${getDensityInfo(apiData.congestion_analysis).bgColor} rounded-xl p-4 text-center border-2 ${getDensityInfo(apiData.congestion_analysis).border} shadow-sm mb-3`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-lg mr-2">{getDensityInfo(apiData.congestion_analysis).icon}</span>
                      <div className="text-sm font-medium opacity-70">Congestion Level</div>
                    </div>
                    <div className={`text-lg font-bold ${getDensityInfo(apiData.congestion_analysis).color}`}>
                      {getDensityInfo(apiData.congestion_analysis).label}
                    </div>
                    
                    {/* Detailed Congestion Breakdown */}
                    {apiData.congestion_analysis && (
                      <div className="mt-3 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="flex items-center"><span className="text-red-500 mr-1">🔴</span>High:</span>
                          <span className="font-bold">{(apiData.congestion_analysis.high_congestion_percent || 0).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center"><span className="text-yellow-500 mr-1">🟡</span>Medium:</span>
                          <span className="font-bold">{(apiData.congestion_analysis.medium_congestion_percent || 0).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center"><span className="text-green-500 mr-1">🟢</span>Low:</span>
                          <span className="font-bold">{(apiData.congestion_analysis.low_congestion_percent || 0).toFixed(1)}%</span>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Density Statistics */}
                  {apiData.density_statistics && (
                    <motion.div 
                      className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-sm font-medium text-purple-700 mb-2 text-center">📊 Density Statistics</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-purple-600 font-bold">{(apiData.density_statistics.max_density || 0).toFixed(3)}</div>
                          <div className="text-purple-500">Max Density</div>
                        </div>
                        <div className="text-center">
                          <div className="text-purple-600 font-bold">{(apiData.density_statistics.avg_density || 0).toFixed(3)}</div>
                          <div className="text-purple-500">Avg Density</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Refresh Button */}
                  <motion.button
                    onClick={() => fetchCrowdData(ghat.name)}
                    className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🔄 Refresh Analysis
                  </motion.button>
                </>
              )}

              {/* Fallback to original image if no API data */}
              {!apiData && !loading && !error && (
                <motion.div 
                  className="w-full h-32 rounded-xl mb-4 bg-cover bg-center border-2 border-orange-200 overflow-hidden shadow-lg"
                  style={{ backgroundImage: `url(${ghatDisplayImages[ghat.name]})` }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Updated Ghats Component - now triggers API calls
const Ghats = ({ onGhatClick }) => {
  const [ghatsData, setGhatsData] = useState([
    // Left side ghats
    { id: 1, name: "Har Ki Pauri", population: 45000, side: "left", position: { top: "20%", left: "8%" } },
    { id: 2, name: "Dashashwamedh", population: 85000, side: "left", position: { top: "60%", left: "12%" } },
    // Right side ghats
    { id: 3, name: "Assi Ghat", population: 35000, side: "right", position: { top: "25%", right: "6%" } },
    { id: 4, name: "Manikarnika", population: 95000, side: "right", position: { top: "65%", right: "10%" } }
  ]);

  const getDensityColor = (population) => {
    const maxPop = 100000;
    const percentage = (population / maxPop) * 100;

    if (percentage >= 80)
      return "from-red-200 via-red-300 to-red-400 border-red-400 shadow-red-300/60";
    if (percentage >= 60)
      return "from-yellow-200 via-yellow-300 to-yellow-400 border-yellow-400 shadow-yellow-300/60";
    if (percentage >= 40)
      return "from-orange-200 via-orange-300 to-orange-400 border-orange-400 shadow-orange-300/60";
    return "from-green-200 via-green-300 to-green-400 border-green-400 shadow-green-300/60";
  };

  const updatePopulation = () => {
    setGhatsData((prevGhats) =>
      prevGhats.map((ghat) => {
        const variation = Math.floor(Math.random() * 4000) - 2000;
        const newPop = Math.max(15000, Math.min(100000, ghat.population + variation));
        return { ...ghat, population: newPop };
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(updatePopulation, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {ghatsData.map((ghat, index) => (
        <motion.div
          key={ghat.id}
          className={`absolute w-40 h-18 rounded-2xl cursor-pointer border-2 flex flex-col items-center justify-center text-orange-900 font-bold text-xs shadow-xl backdrop-blur-sm bg-gradient-to-r ${getDensityColor(
            ghat.population
          )} hover:scale-110 transition-all duration-300`}
          style={ghat.position}
          initial={{ opacity: 0, scale: 0, rotate: ghat.side === 'left' ? -180 : 180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            boxShadow:
              ghat.population > 70000
                ? [
                    "0 8px 25px rgba(0,0,0,0.15)",
                    "0 15px 35px rgba(251, 146, 60, 0.4)",
                    "0 8px 25px rgba(0,0,0,0.15)"
                  ]
                : "0 8px 25px rgba(0,0,0,0.15)"
          }}
          transition={{
            opacity: { delay: 0.5 + index * 0.2, duration: 0.6 },
            scale: { delay: 0.5 + index * 0.2, duration: 0.6, type: "spring", stiffness: 120 },
            rotate: { delay: 0.5 + index * 0.2, duration: 0.8 },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{
            y: -10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onGhatClick(ghat)}
        >
          <div className="text-center leading-tight p-2">
            <div className="text-sm">{ghat.name}</div>
            <div className="text-[10px] opacity-80 mt-1 bg-white/30 px-2 py-1 rounded-full">
              🎯 AI Analysis
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Left Content Component
const LeftContent = () => (
  <motion.div 
    className="flex flex-col h-full"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    <motion.h1 
      className="text-4xl font-bold text-orange-800 mb-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      🕉️ Sacred Kumbh Mela
      <motion.div 
        className="text-2xl font-normal text-orange-600 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Real-time Ghat Monitoring
      </motion.div>
    </motion.h1>

    <motion.div 
      className="mb-6 overflow-hidden rounded-2xl border-2 border-orange-200 shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <img 
        src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop" 
        alt="Kumbh Mela Ganga Aarti"
        className="w-full h-64 object-cover"
      />
    </motion.div>

    <motion.div 
      className="text-orange-700 leading-relaxed space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <p className="text-base">
        🌊 Experience the divine confluence where millions of devotees gather at the sacred ghats of the Ganges. 
        Our real-time monitoring system tracks pilgrim density across major ghats to ensure safety and spiritual fulfillment.
      </p>
      
      <motion.p 
        className="text-sm bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border-2 border-orange-200 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        🙏 <strong>Click on any ghat marker</strong> to view detailed information including current pilgrim count, 
        density levels, and sacred imagery. Watch as the numbers update in real-time, reflecting the ebb and flow 
        of this magnificent spiritual gathering.
      </motion.p>
    </motion.div>
  </motion.div>
);

// Main Component
const KumbhMelaMonitor = () => {
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
    <div 
      className="min-h-screen font-sans pt-16"
      style={{ 
        background: 'linear-gradient(135deg, #FFFBF7 0%, #fff5ed 50%, #ffe9e2 100%)' 
      }}
    >
      <motion.div 
        className="w-full h-screen flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Content */}
        <div className="w-1/2 p-8 flex items-center">
          <LeftContent />
        </div>
        
        {/* Right Content - Monitoring Area */}
        <div className="w-1/2 relative p-6">
          <motion.div 
            className="w-full h-full bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-orange-200 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Live Indicator */}
            <motion.div 
              className="absolute top-6 right-6 flex items-center text-orange-800 font-bold z-20 bg-white/90 px-4 py-2 rounded-full border border-orange-200 shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <motion.div 
                className="w-3 h-3 bg-green-400 rounded-full mr-2"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm">LIVE</span>
            </motion.div>

            {/* River */}
            <River />
            
            {/* Ghats */}
            <Ghats onGhatClick={handleGhatClick} />
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Popup */}
      <Popup 
        ghat={selectedGhat}
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default KumbhMelaMonitor;
