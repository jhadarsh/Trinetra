import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SafeZonePage = () => {
  const [activeTab, setActiveTab] = useState('2 Ghats');
  const [isMapHovered, setIsMapHovered] = useState(false);

  // Tab data with cards
  const tabsData = {
    '2 Ghats': [
      {
        title: 'Ghat 1 - Sunrise Point',
        description: 'Beautiful morning view with peaceful atmosphere. Perfect for meditation and early morning activities.',
        logo: '🌅',
        btnText: 'Explore Now'
      },
      {
        title: 'Ghat 2 - Main Ghat',
        description: 'Central location with all amenities. Most visited spot with cultural activities.',
        logo: '🏛️',
        btnText: 'Visit Today'
      }
    ],
    'Medical': [
      {
        title: 'First Aid Station',
        description: 'Emergency medical assistance available 24/7. Trained professionals on duty.',
        logo: '🏥',
        btnText: 'Get Help'
      },
      {
        title: 'Ambulance Service',
        description: 'Quick response emergency vehicle service. Direct hospital connectivity.',
        logo: '🚑',
        btnText: 'Emergency Call'
      },
      {
        title: 'Medical Store',
        description: 'Basic medicines and health supplies available at affordable prices.',
        logo: '💊',
        btnText: 'Shop Now'
      }
    ],
    'Washroom': [
      {
        title: 'Public Restroom A',
        description: 'Clean and well-maintained facilities with regular sanitization.',
        logo: '🚻',
        btnText: 'Locate'
      },
      {
        title: 'Accessible Washroom',
        description: 'Specially designed for differently-abled visitors with all amenities.',
        logo: '♿',
        btnText: 'Find Route'
      }
    ],
    'Police': [
      {
        title: 'Police Station 1',
        description: 'Main security post with 24/7 patrol officers and emergency response.',
        logo: '👮',
        btnText: 'Contact'
      },
      {
        title: 'Security Booth',
        description: 'Quick help desk for immediate assistance and lost & found services.',
        logo: '🛡️',
        btnText: 'Report Issue'
      }
    ],
    'Changing Room': [
      {
        title: 'Changing Room A',
        description: 'Private and secure changing facilities with lockers and benches.',
        logo: '🚪',
        btnText: 'Reserve'
      },
      {
        title: 'Family Room',
        description: 'Spacious room suitable for families with children and elderly.',
        logo: '👨‍👩‍👧‍👦',
        btnText: 'Book Now'
      }
    ]
  };

  const handleDownloadPDF = () => {
    // Create a dummy PDF download - replace with your actual PDF path
    const link = document.createElement('a');
    link.href = 'MahaKumbhMap.pdf'; // Replace with your actual PDF path
    link.download = 'MahaKumbhMap.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Downloading PDF...');
  };

  return (
    <div 
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(to right, #F4A391, #E0B9C2, #EACDC6)'
      }}
    >
       
      {/* Header Section - 30% */}
      <motion.header
        className="h-[30vh]  flex items-center justify-center px-6"
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
            Immerse yourself in our comprehensive virtual tour discover locations, services, and amenities before your visit
          </motion.p>
        </div>
      </motion.header>

      {/* Map Section - 50% */}
      <motion.section
        className="h-[50vh] relative mt-16 cursor-pointer overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onMouseEnter={() => setIsMapHovered(true)}
        onMouseLeave={() => setIsMapHovered(false)}
        onClick={handleDownloadPDF}
        style={{
          backgroundImage: `url('mapimg.png')`,
          backgroundSize: '120%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Hover overlay */}
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

        {/* Download indicator */}
        <motion.div
          className="absolute bottom-6 right-6 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg font-medium"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          Click to download map PDF
        </motion.div>

        {/* Map title overlay */}
        <motion.div
          className="absolute top-6 left-6 bg-white bg-opacity-90 text-black px-6 py-3 rounded-lg font-bold text-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          Interactive Zone Map
        </motion.div>
      </motion.section>

      {/* Tabs Section - 20% */}
      <motion.section
        className="h-[100vh] bg-white mt-16 bg-opacity-20 backdrop-blur-sm border-t-2 border-white border-opacity-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="h-full p-6">
          {/* Tab Headers */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {Object.keys(tabsData).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white bg-opacity-50 text-black hover:bg-opacity-70'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Tab Content - Cards */}
          <motion.div
            key={activeTab}
            className="flex space-x-4 overflow-x-auto pb-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {tabsData[activeTab].map((card, index) => (
              <motion.div
                key={index}
                className="min-w-[280px] bg-white bg-opacity-90 p-4 rounded-xl shadow-lg backdrop-blur-sm border border-white border-opacity-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Logo */}
                <div className="text-3xl mb-3">{card.logo}</div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-black mb-2 leading-tight">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-black opacity-80 mb-4 line-clamp-2">
                  {card.description}
                </p>
                
                {/* Button */}
                <motion.button
                  className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert(`Clicked on ${card.title}`)}
                >
                  {card.btnText}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    
    </div>
  );
};

export default SafeZonePage;
