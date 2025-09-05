import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const AnimatedAvatar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    icon: React.ComponentType<any>;
    color: string;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate floating elements around avatar
    const elements = [
      { icon: Sparkles, color: 'text-yellow-400', count: 3 },
      { icon: Heart, color: 'text-pink-400', count: 2 },
      { icon: Star, color: 'text-blue-400', count: 2 }
    ];

    const generated = elements.flatMap(({ icon, color, count }) =>
      Array.from({ length: count }, (_, i) => ({
        id: Math.random(),
        x: Math.random() * 200 - 100, // -100 to 100
        y: Math.random() * 200 - 100,
        icon,
        color,
        delay: Math.random() * 2
      }))
    );

    setFloatingElements(generated);
  }, []);

  return (
    <div className="relative mb-8">
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main avatar container */}
        <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 p-1 animate-scaleIn relative overflow-visible">
          {/* Avatar image */}
          <div className="w-full h-full rounded-full overflow-hidden relative group-hover:scale-105 transition-all duration-500">
            <img
              src="https://res.cloudinary.com/doivdewue/image/upload/v1756521048/images_1_qc6a7g.jpg"
              alt="Nguyễn Công Khánh Tài"
              className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
            />
            
            {/* Overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" 
                 style={{ 
                   background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                   WebkitMask: 'radial-gradient(circle, transparent 50%, black 52%)',
                   mask: 'radial-gradient(circle, transparent 50%, black 52%)'
                 }} 
            />
          </div>

          {/* Floating elements */}
          {floatingElements.map((element) => {
            const Icon = element.icon;
            return (
              <div
                key={element.id}
                className={`absolute ${element.color} transition-all duration-700 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
                style={{
                  left: `calc(50% + ${element.x}px)`,
                  top: `calc(50% + ${element.y}px)`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${element.delay}s`
                }}
              >
                <Icon 
                  size={16} 
                  className={`animate-float ${isHovered ? 'animate-pulse' : ''}`}
                />
              </div>
            );
          })}

          {/* Pulse rings */}
          <div className={`absolute inset-0 rounded-full border-2 border-blue-400/50 transition-all duration-1000 ${
            isHovered ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
          }`} />
          <div className={`absolute inset-0 rounded-full border-2 border-purple-400/30 transition-all duration-1000 delay-200 ${
            isHovered ? 'scale-150 opacity-0' : 'scale-110 opacity-100'
          }`} />
        </div>

        {/* Status indicator */}
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        </div>

        {/* Hover text */}
        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          Hello there! 👋
        </div>
      </div>

      {/* Background glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-all duration-700 ${
        isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-50'
      }`} style={{ zIndex: -1 }} />
    </div>
  );
};

export default AnimatedAvatar;