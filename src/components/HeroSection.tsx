import React from 'react';
import { Mail, Download, Github, Phone, Globe, ChevronDown, User, Sparkles } from 'lucide-react';
import TypewriterText from './ui/TypewriterText';
import DynamicSkyBackground from './ui/DynamicSkyBackground';
import AnimatedAvatar from './ui/AnimatedAvatar';

interface HeroSectionProps {
  translations: any;
  personalData: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ translations, personalData }) => {
  const typewriterTexts = [
    'Software Engineer',
    'Backend Developer'
    
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      <DynamicSkyBackground />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-12 animate-fadeInUp">
          <AnimatedAvatar />

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slideInLeft">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {translations.name}
            </span>
          </h1>

          <div className="relative mb-8 animate-slideInRight">
            <div className="text-xl md:text-3xl font-semibold mb-4 h-12 flex items-center justify-center">
              <span className="bg-gradient-to-r from-gray-700 via-blue-600 to-purple-600 dark:from-gray-300 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                <TypewriterText texts={typewriterTexts} speed={150} deleteSpeed={100} pauseDuration={2000} />
              </span>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeInUp stagger-3">
            {translations.subtitle}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 animate-fadeInUp stagger-4">
          {/* Get in touch */}
          <a
            href={`mailto:${personalData.email}`}
            className="group relative overflow-hidden flex items-center justify-center px-8 py-4 rounded-2xl font-semibold shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white btn-enhanced"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-3">
              <Mail size={24} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg">{translations.buttons.getInTouch}</span>
            </div>
          </a>

          {/* Download CV */}
          <a
            href="https://drive.google.com/uc?export=download&id=14axVlvs48NAZqfOhWJbw095WqhmiPQZo"
            className="group flex items-center justify-center space-x-3 px-8 py-4 border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl btn-enhanced relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <Download size={24} className="group-hover:animate-bounce relative z-10" />
            <span className="text-lg relative z-10">{translations.buttons.downloadCV}</span>
          </a>
        </div>

        {/* Social icons */}
        <div className="flex justify-center space-x-6 animate-fadeInUp stagger-5">
          {[
            { href: personalData.github, icon: Github, color: 'from-gray-600 to-gray-800' },
            { href: `mailto:${personalData.email}`, icon: Mail, color: 'from-red-500 to-pink-600' },
            { href: `tel:${personalData.phone}`, icon: Phone, color: 'from-green-500 to-emerald-600' },
            { href: personalData.portfolio, icon: Globe, color: 'from-blue-500 to-cyan-600' }
          ].map(({ href, icon: Icon, color }, index) => (
            <a
              key={index}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl btn-enhanced relative overflow-hidden animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
              <Icon
                size={28}
                className="text-gray-600 dark:text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10"
              />
            </a>
          ))}
        </div>

        <div className="mt-16 animate-fadeInUp stagger-5">
          <ChevronDown
            size={40}
            className="mx-auto text-gray-400 hover:text-blue-600 cursor-pointer animate-bounce hover:animate-pulse transition-colors duration-300"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
