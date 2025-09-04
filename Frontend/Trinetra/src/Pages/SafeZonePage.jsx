import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMap, FiDownload, FiArrowRight, FiInfo, FiSearch } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';

const ENTRY_LOCATIONS = {
  'Entry 1': {
    name: 'Entry Number 1',
    googleMapsUrl: 'https://www.google.com/maps?q=Entry+Number+1+Kumbh',
  },
  'Entry 2': {
    name: 'Entry Number 2',
    googleMapsUrl: 'https://www.google.com/maps?q=Entry+Number+2+Kumbh',
    tag: 'Suggested',
  },
  'Entry 3': {
    name: 'Entry Number 3',
    googleMapsUrl: 'https://www.google.com/maps?q=Entry+Number+3+Kumbh',
    tag: 'High Traffic',
  },
  'Entry 4': {
    name: 'Entry Number 4',
    googleMapsUrl: 'https://www.google.com/maps?q=Entry+Number+4+Kumbh',
  },
};

const SafeZonePage = () => {
  const [activeTab, setActiveTab] = useState('2 Ghats');
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [comingFrom, setComingFrom] = useState('');
  const [showEntries, setShowEntries] = useState(false);

  // Tab data with cards (unchanged - as per request)
  const tabsData = {
    '2 Ghats': [
      {
        title: 'Ghat 1 - Sunrise Point',
        description: 'Beautiful morning view with peaceful atmosphere. Perfect for meditation and early morning activities.',
        logo: '🌅',
        btnText: 'Explore Now',
      },
      {
        title: 'Ghat 2 - Main Ghat',
        description: 'Central location with all amenities. Most visited spot with cultural activities.',
        logo: '🏛️',
        btnText: 'Visit Today',
      },
    ],
    Medical: [
      {
        title: 'First Aid Station',
        description: 'Emergency medical assistance available 24/7. Trained professionals on duty.',
        logo: '🏥',
        btnText: 'Get Help',
      },
      {
        title: 'Ambulance Service',
        description: 'Quick response emergency vehicle service. Direct hospital connectivity.',
        logo: '🚑',
        btnText: 'Emergency Call',
      },
      {
        title: 'Medical Store',
        description: 'Basic medicines and health supplies available at affordable prices.',
        logo: '💊',
        btnText: 'Shop Now',
      },
    ],
    Washroom: [
      {
        title: 'Public Restroom A',
        description: 'Clean and well-maintained facilities with regular sanitization.',
        logo: '🚻',
        btnText: 'Locate',
      },
      {
        title: 'Accessible Washroom',
        description: 'Specially designed for differently-abled visitors with all amenities.',
        logo: '♿',
        btnText: 'Find Route',
      },
    ],
    Police: [
      {
        title: 'Police Station 1',
        description: 'Main security post with 24/7 patrol officers and emergency response.',
        logo: '👮',
        btnText: 'Contact',
      },
      {
        title: 'Security Booth',
        description: 'Quick help desk for immediate assistance and lost & found services.',
        logo: '🛡️',
        btnText: 'Report Issue',
      },
    ],
    'Changing Room': [
      {
        title: 'Changing Room A',
        description: 'Private and secure changing facilities with lockers and benches.',
        logo: '🚪',
        btnText: 'Reserve',
      },
      {
        title: 'Family Room',
        description: 'Spacious room suitable for families with children and elderly.',
        logo: '👨‍👩‍👧‍👦',
        btnText: 'Book Now',
      },
    ],
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = 'MahaKumbhMap.pdf';
    link.download = 'MahaKumbhMap.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (comingFrom.trim()) {
      setShowEntries(true);
    } else {
      setShowEntries(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full font-sans text-gray-800"
      style={{
        background: 'linear-gradient(to bottom right, #F4A391, #E0B9C2, #EACDC6)',
      }}
    >
      <div className="relative z-10 p-6 sm:p-12">
        {/* Header Section */}
        <motion.header
          className="text-center pt-24 pb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4"
            style={{ color: 'white' }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            Virtual Experience Center
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            style={{ color: 'white' }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5 }}
          >
            Immerse yourself in our comprehensive virtual tour. Discover locations, services, and amenities before your visit.
          </motion.p>
        </motion.header>
        
        ---

        {/* Side-by-Side Sections Container */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 mt-10">
          
          {/* Left Section (Coming From Input) */}
          <div className="w-full md:w-1/2">
            <motion.section
              className="p-6 bg-white bg-opacity-70 rounded-2xl shadow-2xl backdrop-blur-md border border-white border-opacity-90 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleLocationSubmit} className="flex flex-col space-y-4">
                <label htmlFor="comingFrom" className="font-semibold text-xl text-gray-800 flex items-center gap-2">
                  <HiOutlineLocationMarker className="text-pink-500" /> Enter your coming location
                </label>
                <div className="relative">
                  <input
                    id="comingFrom"
                    type="text"
                    className="w-full px-5 py-3 rounded-xl bg-white bg-opacity-60 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition-all duration-300"
                    placeholder="E.g. Delhi, Mumbai, Lucknow"
                    value={comingFrom}
                    onChange={(e) => setComingFrom(e.target.value)}
                    required
                  />
                  <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                >
                  Show Entries <BsArrowRight />
                </motion.button>
              </form>
            </motion.section>
            <AnimatePresence>
              {showEntries && (
                <motion.section
                  className="max-w-lg mx-auto mt-8 p-6 bg-white bg-opacity-70 rounded-2xl shadow-2xl backdrop-blur-md border border-white border-opacity-90 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Choose Your Entry Point
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(ENTRY_LOCATIONS).map(([key, entry]) => (
                      <motion.div
                        key={key}
                        className="flex justify-between items-center p-4 bg-white bg-opacity-60 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        whileHover={{ y: -5, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="text-lg font-semibold text-gray-900 flex items-center space-x-3">
                          <span>{entry.name}</span>
                          {entry.tag && (
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full ${
                                entry.tag === 'Suggested'
                                  ? 'bg-green-500 text-white'
                                  : entry.tag === 'High Traffic'
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-400 text-gray-800'
                              }`}
                            >
                              {entry.tag}
                            </span>
                          )}
                        </div>
                        <a
                          href={entry.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 font-semibold hover:underline transition-colors duration-200 flex items-center gap-1"
                        >
                          View Location <FiArrowRight />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          {/* Right Section (Map) */}
          <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
            <motion.section
              className="relative cursor-pointer overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 w-96 h-96"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onMouseEnter={() => setIsMapHovered(true)}
              onMouseLeave={() => setIsMapHovered(false)}
              onClick={handleDownloadPDF}
              style={{
                backgroundImage: `url('mapimg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Hover overlay */}
              <AnimatePresence>
                {isMapHovered && (
                  <motion.div
                    className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              {/* Download indicator */}
              <motion.div
                className="absolute bottom-6 right-6 bg-gray-900 bg-opacity-70 text-white px-5 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <FiDownload />
              </motion.div>

              {/* Map title overlay */}
              <motion.div
                className="absolute top-6 left-6 bg-white bg-opacity-70 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-bold text-lg border border-white border-opacity-90 shadow-md"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <FiMap className="text-pink-500" /> Interactive Zone Map
                </div>
              </motion.div>
            </motion.section>
          </div>
        </div>
        
        ---

        {/* Tabs Section */}
        <motion.section
          className="mt-20 px-6 sm:px-12 pb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
              Explore Amenities & Services
            </h2>
            {/* Tab Headers */}
            <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
              {Object.keys(tabsData).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-white text-pink-500 shadow-xl border-2 border-pink-500'
                      : 'bg-white bg-opacity-50 text-gray-800 hover:bg-opacity-70'
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {tabsData[activeTab].map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-white border-opacity-90 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Logo */}
                  <div className="text-4xl mb-4 transform transition-transform duration-300 hover:rotate-6">
                    {card.logo}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{card.title}</h3>
                    <p className="text-sm text-gray-700 mb-4">{card.description}</p>
                  </div>

                  {/* Button */}
                  <motion.button
                    className="w-full bg-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert(`Clicked on ${card.title}`)}
                  >
                    {card.btnText}
                    <FiArrowRight />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SafeZonePage;