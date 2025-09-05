import React, { useState, useEffect, useMemo } from 'react';

interface SkyState {
  timeOfDay: 'dawn' | 'day' | 'dusk' | 'night';
  sunPosition: number; // 0-100
  moonPosition: number; // 0-100
  showStars: boolean;
  showClouds: boolean;
}

const DynamicSkyBackground: React.FC = () => {
  const [skyState, setSkyState] = useState<SkyState>({
    timeOfDay: 'day',
    sunPosition: 50,
    moonPosition: 50,
    showStars: false,
    showClouds: true
  });

  const [isAutoMode, setIsAutoMode] = useState(true);
  const [manualMode, setManualMode] = useState<'day' | 'night' | null>(null);

  // Check for reduced motion and data saver preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as any).connection?.saveData || false;

  const shouldShowAnimations = !prefersReducedMotion;
  const shouldShowClouds = !saveData && shouldShowAnimations;

  useEffect(() => {
    const updateSky = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      
      let timeOfDay: SkyState['timeOfDay'];
      let sunPosition: number;
      let moonPosition: number;
      let showStars: boolean;

      if (isAutoMode && !manualMode) {
        // Auto mode based on real time
        if (totalMinutes >= 360 && totalMinutes < 420) { // 6:00-7:00 AM
          timeOfDay = 'dawn';
          sunPosition = ((totalMinutes - 360) / 60) * 100;
          moonPosition = 100 - sunPosition;
          showStars = false;
        } else if (totalMinutes >= 420 && totalMinutes < 1080) { // 7:00 AM - 6:00 PM
          timeOfDay = 'day';
          sunPosition = 20 + ((totalMinutes - 420) / 660) * 60; // Move from 20% to 80%
          moonPosition = 0;
          showStars = false;
        } else if (totalMinutes >= 1080 && totalMinutes < 1140) { // 6:00-7:00 PM
          timeOfDay = 'dusk';
          sunPosition = 100 - ((totalMinutes - 1080) / 60) * 100;
          moonPosition = ((totalMinutes - 1080) / 60) * 100;
          showStars = true;
        } else { // 7:00 PM - 6:00 AM
          timeOfDay = 'night';
          sunPosition = 0;
          moonPosition = 20 + ((totalMinutes > 1140 ? totalMinutes - 1140 : totalMinutes + 300) / 660) * 60;
          showStars = true;
        }
      } else {
        // Manual mode
        const mode = manualMode || 'day';
        if (mode === 'day') {
          timeOfDay = 'day';
          sunPosition = 50;
          moonPosition = 0;
          showStars = false;
        } else {
          timeOfDay = 'night';
          sunPosition = 0;
          moonPosition = 50;
          showStars = true;
        }
      }

      setSkyState({
        timeOfDay,
        sunPosition,
        moonPosition,
        showStars: showStars && shouldShowAnimations,
        showClouds: shouldShowClouds
      });
    };

    updateSky();
    const interval = setInterval(updateSky, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isAutoMode, manualMode, shouldShowAnimations, shouldShowClouds]);

  const skyGradient = useMemo(() => {
    switch (skyState.timeOfDay) {
      case 'dawn':
        return 'from-orange-300 via-pink-200 to-blue-300';
      case 'day':
        return 'from-blue-400 via-blue-300 to-blue-100';
      case 'dusk':
        return 'from-purple-400 via-pink-300 to-orange-200';
      case 'night':
        return 'from-indigo-900 via-purple-900 to-blue-900';
      default:
        return 'from-blue-400 via-blue-300 to-blue-100';
    }
  }, [skyState.timeOfDay]);

  const stars = useMemo(() => {
    if (!skyState.showStars) return [];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60, // Only in upper 60% of screen
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleDelay: Math.random() * 3
    }));
  }, [skyState.showStars]);

  const clouds = useMemo(() => {
    if (!skyState.showClouds) return [];
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (i * 20 + Math.random() * 10) % 100,
      y: 10 + Math.random() * 30,
      size: 60 + Math.random() * 40,
      opacity: 0.3 + Math.random() * 0.4,
      speed: 20 + Math.random() * 30 // seconds for full traverse
    }));
  }, [skyState.showClouds]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${skyGradient} transition-all duration-1000 ease-in-out`} />
      
      {/* Sun */}
      {skyState.sunPosition > 0 && (
        <div
          className="absolute w-16 h-16 bg-yellow-400 rounded-full shadow-lg transition-all duration-1000 ease-in-out"
          style={{
            left: `${skyState.sunPosition}%`,
            top: `${20 + Math.sin((skyState.sunPosition / 100) * Math.PI) * -10}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 30px rgba(255, 255, 0, 0.5)'
          }}
        />
      )}

      {/* Moon */}
      {skyState.moonPosition > 0 && (
        <div
          className="absolute w-12 h-12 bg-gray-200 rounded-full shadow-lg transition-all duration-1000 ease-in-out"
          style={{
            left: `${skyState.moonPosition}%`,
            top: `${25 + Math.sin((skyState.moonPosition / 100) * Math.PI) * -15}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
          }}
        />
      )}

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.twinkleDelay}s`,
            animationDuration: '2s'
          }}
        />
      ))}

      {/* Clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute bg-white rounded-full opacity-30"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            transform: 'translate(-50%, -50%)',
            opacity: cloud.opacity,
            animation: shouldShowAnimations ? `float ${cloud.speed}s ease-in-out infinite` : 'none'
          }}
        >
          {/* Cloud parts for more realistic shape */}
          <div className="absolute -left-2 -top-1 w-8 h-8 bg-white rounded-full opacity-80" />
          <div className="absolute -right-2 -top-1 w-6 h-6 bg-white rounded-full opacity-80" />
          <div className="absolute left-1/2 -top-2 w-4 h-4 bg-white rounded-full opacity-80 transform -translate-x-1/2" />
        </div>
      ))}

      {/* Control panel */}
      <div className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              isAutoMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => {
              setIsAutoMode(false);
              setManualMode(manualMode === 'day' ? null : 'day');
            }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              !isAutoMode && manualMode === 'day'
                ? 'bg-yellow-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => {
              setIsAutoMode(false);
              setManualMode(manualMode === 'night' ? null : 'night');
            }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              !isAutoMode && manualMode === 'night'
                ? 'bg-indigo-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Night
          </button>
        </div>
        <div className="text-xs text-white/80 text-center">
          {skyState.timeOfDay.charAt(0).toUpperCase() + skyState.timeOfDay.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default DynamicSkyBackground;