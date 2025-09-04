import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SafeZonePage = () => {
  const tabsData = {
    "2 Ghats": [
      {
        title: "Ram Ghat",
        description:
          "Beautiful morning view with peaceful atmosphere. Perfect for meditation and early morning activities.",
        logo: "🌅",
        tourLink: (
          <iframe
            width="90%"
            height="500px"
            allowFullScreen={true}
            allow="accelerometer; magnetometer; gyroscope; xr-spatial-tracking"
            style={{
              display: "block",
              margin: "20px auto",
              border: "none",
              maxWidth: "880px",
              borderRadius: "8px",
              boxShadow:
                "0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)"
            }}
            src="https://panoraven.com/en/embed/mqOOcimUQH"
          />
        ),
        btnText: "Ram Ghat"
      },
      {
        title: "Ghat 2 - Main Ghat",
        description:
          "Central location with all amenities. Most visited spot with cultural activities.",
        logo: "🏛",
        tourLink: (
          <iframe
            width="90%"
            height="500px"
            allowFullScreen={true}
            allow="accelerometer; magnetometer; gyroscope; xr-spatial-tracking"
            style={{
              display: "block",
              margin: "20px auto",
              border: "none",
              maxWidth: "880px",
              borderRadius: "8px",
              boxShadow:
                "0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)"
            }}
            src="https://panoraven.com/en/embed/EQHno0cuw7"
          />
        ),
        btnText: "Shyam Ghat"
      }
    ],
    Medical: [
      {
        title: "First Aid Station",
        description:
          "Emergency medical assistance available 24/7. Trained professionals on duty.",
        logo: "🏥",
        tourLink: (
          <iframe
            width="90%"
            height="500px"
            allowFullScreen={true}
            allow="accelerometer; magnetometer; gyroscope; xr-spatial-tracking"
            style={{
              display: "block",
              margin: "20px auto",
              border: "none",
              maxWidth: "880px",
              borderRadius: "8px",
              boxShadow:
                "0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)"
            }}
            src="https://panoraven.com/en/embed/EQHno0cuw7"
          />
        ),
        btnText: "First Aid Station"
      }
    ],
    Washroom: [
      {
        title: "First Aid Station",
        description:
          "Emergency medical assistance available 24/7. Trained professionals on duty.",
        logo: "🏥",
        tourLink: (
          <iframe
            width="90%"
            height="500px"
            allowFullScreen={true}
            allow="accelerometer; magnetometer; gyroscope; xr-spatial-tracking"
            style={{
              display: "block",
              margin: "20px auto",
              border: "none",
              maxWidth: "880px",
              borderRadius: "8px",
              boxShadow:
                "0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)"
            }}
            src="https://panoraven.com/en/embed/EQHno0cuw7"
          />
        ),
        btnText: "Washroom"
      }
    ]
  };

  // Default tab and tour
  const [activeTab, setActiveTab] = useState("2 Ghats");
  const [activeTour, setActiveTour] = useState(
    tabsData["2 Ghats"][0].tourLink
  ); // Ram Ghat as default

  const [isMapHovered, setIsMapHovered] = useState(false);

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "MahaKumbhMap.pdf";
    link.download = "MahaKumbhMap.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("Downloading PDF...");
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(to right, #F4A391, #E0B9C2, #EACDC6)"
      }}
    >
      {/* Header Section */}
      <motion.header
        className="h-[30vh] flex items-center justify-center px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mt-24">
          <motion.h1
            className="text-5xl font-bold text-black mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Virtual Experience Center
          </motion.h1>
          <motion.p
            className="text-xl text-black opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5 }}
          >
            Immerse yourself in our comprehensive virtual tour discover
            locations, services, and amenities before your visit
          </motion.p>
        </div>
      </motion.header>

      {/* Map Section */}
      <motion.section
        className="h-[50vh] relative mt-16 cursor-pointer overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onMouseEnter={() => setIsMapHovered(true)}
        onMouseLeave={() => setIsMapHovered(false)}
        onClick={handleDownloadPDF}
      style={{
  backgroundImage: "url('mapimg.png')",
  backgroundSize: "120%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
}}

      >
        <AnimatePresence>
          {isMapHovered && (
            <motion.div
              className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="absolute bottom-6 right-6 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg font-medium"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          Click to download map PDF
        </motion.div>

        <motion.div
          className="absolute top-6 left-6 bg-white bg-opacity-90 text-black px-6 py-3 rounded-lg font-bold text-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          Interactive Zone Map
        </motion.div>
      </motion.section>

      {/* Tabs Section */}
      <motion.section
        className="bg-white mt-16 bg-opacity-20 backdrop-blur-sm border-t-2 border-white border-opacity-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="p-6">
          {/* Tab Headers */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {Object.keys(tabsData).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // reset to first card of the selected tab
                  setActiveTour(tabsData[tab][0]?.tourLink || null);
                }}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-black text-white shadow-lg"
                    : "bg-white bg-opacity-50 text-black hover:bg-opacity-70"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Tab Content - Buttons only */}
          <motion.div
            key={activeTab}
            className="flex space-x-4 overflow-x-auto pb-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {tabsData[activeTab].map((card, index) => (
              <motion.button
                key={index}
                className="min-w-[180px] bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTour(card.tourLink || null)}
              >
                {card.btnText}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Virtual Tour Section */}
      {activeTour && (
        <motion.div
          className="pb-2 bg-opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {activeTour}
        </motion.div>
      )}
    </div>
  );
};

export default SafeZonePage;