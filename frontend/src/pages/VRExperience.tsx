// pages/VRExperience.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Volume2, VolumeX, RotateCw, Info } from 'lucide-react';

export default function VRExperience() {
  const [selectedView, setSelectedView] = useState('netarhat');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const vrLocations = [
    { 
      id: 'netarhat', 
      name: 'Netarhat Sunset Point', 
      image: 'https://images.unsplash.com/photo-1625505826533-5c80aca7d656?w=1200',
      video: 'https://example.com/vr-netarhat.mp4',
      description: 'Experience the breathtaking sunset from Netarhat, the Queen of Chotanagpur. Watch the sky turn into a canvas of orange and pink as the sun sets over the hills.',
      duration: '2:30 min',
      difficulty: 'Easy',
      bestTime: 'Evening',
      highlights: ['Sunset view', 'Mist-covered hills', 'Photography spot']
    },
    { 
      id: 'hundru', 
      name: 'Hundru Falls', 
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200',
      video: 'https://example.com/vr-hundru.mp4',
      description: 'Feel the mist of Hundru Falls as it plunges 98 meters. Experience the raw power of nature with 360° audio of cascading water.',
      duration: '3:15 min',
      difficulty: 'Moderate',
      bestTime: 'Monsoon',
      highlights: ['Waterfall views', 'Rainbow sightings', 'Sound of water']
    },
    { 
      id: 'betla', 
      name: 'Betla National Park', 
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200',
      video: 'https://example.com/vr-betla.mp4',
      description: 'Spot wildlife in their natural habitat at Betla. Get up close with elephants, tigers, and exotic birds in this immersive safari experience.',
      duration: '4:00 min',
      difficulty: 'Easy',
      bestTime: 'Morning',
      highlights: ['Wildlife spotting', 'Jungle sounds', 'Safari experience']
    },
    { 
      id: 'parasnath', 
      name: 'Parasnath Hill', 
      image: 'https://images.unsplash.com/photo-1626621341517-bf5d39b7711b?w=1200',
      video: 'https://example.com/vr-parasnath.mp4',
      description: 'Visit the highest peak in Jharkhand, a sacred Jain pilgrimage site. Explore ancient temples and enjoy panoramic views.',
      duration: '3:45 min',
      difficulty: 'Moderate',
      bestTime: 'Sunrise',
      highlights: ['Temple views', 'Mountain panorama', 'Spiritual ambiance']
    },
  ];

  const currentLocation = vrLocations.find(l => l.id === selectedView)!;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-accent/10 rounded-full mb-4 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
            <span className="text-5xl relative z-10">🕶️</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Immersive VR Experience</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Jharkhand's beautiful destinations in stunning 360° virtual reality. 
            Feel like you're really there.
          </p>
        </motion.div>

        {/* VR Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          <div className="relative aspect-video">
            {/* Placeholder for actual VR content - replace with iframe or video */}
            <img
              src={currentLocation.image}
              alt={currentLocation.name}
              className="w-full h-full object-cover"
            />
            
            {/* VR Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30">
              {/* Top Bar */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  LIVE
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-white transition"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-white transition"
                  >
                    {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                </div>
              </div>

              {/* Center Message */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-pulse">🕶️</div>
                  <p className="text-white text-2xl font-semibold mb-2">360° Virtual Reality</p>
                  <p className="text-white/80">Drag to look around • Use VR headset for immersive experience</p>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="bg-black/50 hover:bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center gap-2 transition"
                >
                  <Info size={18} />
                  <span>Info</span>
                </button>
                <div className="flex gap-2">
                  <button className="bg-black/50 hover:bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center gap-2 transition">
                    <RotateCw size={18} />
                    <span>Reset View</span>
                  </button>
                  <button className="bg-accent hover:bg-accent-dark px-6 py-2 rounded-full text-white font-semibold transition">
                    Enter VR Mode
                  </button>
                </div>
              </div>

              {/* Info Panel */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-20 left-4 bg-black/80 backdrop-blur-md rounded-xl p-4 text-white max-w-md"
                  >
                    <h3 className="font-bold text-lg mb-2">{currentLocation.name}</h3>
                    <p className="text-sm text-white/80 mb-3">{currentLocation.description}</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-white/60">Duration</p>
                        <p className="font-medium">{currentLocation.duration}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Difficulty</p>
                        <p className="font-medium">{currentLocation.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Best Time</p>
                        <p className="font-medium">{currentLocation.bestTime}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Location Info Bar */}
          <div className="bg-white p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-primary">{currentLocation.name}</h2>
                <p className="text-gray-600 text-sm">{currentLocation.description.substring(0, 100)}...</p>
              </div>
              <div className="flex gap-2">
                {currentLocation.highlights.map((highlight, i) => (
                  <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {vrLocations.map((location, index) => (
            <motion.button
              key={location.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedView(location.id)}
              className={`relative rounded-xl overflow-hidden group ${
                selectedView === location.id ? 'ring-4 ring-accent' : ''
              }`}
            >
              <img src={location.image} alt={location.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-white font-semibold">{location.name}</span>
                <span className="text-white/80 text-sm">{location.duration}</span>
              </div>
              {selectedView === location.id && (
                <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                  Selected
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* How to Use VR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">How to Experience VR</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">1. Use Your Phone</h3>
              <p className="text-gray-600 text-sm">For the best experience, use a smartphone with a gyroscope. Move your phone to look around.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition">
                <span className="text-4xl">🔄</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">2. Drag to Navigate</h3>
              <p className="text-gray-600 text-sm">On desktop, click and drag to rotate the view. Use mouse wheel to zoom in/out.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition">
                <span className="text-4xl">🕶️</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">3. VR Headset</h3>
              <p className="text-gray-600 text-sm">For immersive experience, use Google Cardboard or any VR headset with your phone.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}