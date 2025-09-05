import React, { useState, useMemo } from 'react';
import SplashScreen from './components/SplashScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import FloatingActionButton from './components/ui/FloatingActionButton';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { useScrollTracking } from './hooks/useScrollTracking';
import { 
  getCachedTranslations, 
  getCachedPersonalData, 
  getCachedExperienceData, 
  getCachedProjectsData 
} from './utils/dataLoader';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { theme, isDarkMode, toggleTheme, changeTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { activeSection, isScrolled, scrollToSection } = useScrollTracking();

  // Memoized data loading for performance
  const data = useMemo(() => ({
    translations: getCachedTranslations(language),
    personalData: getCachedPersonalData(),
    experienceData: getCachedExperienceData(),
    projectsData: getCachedProjectsData()
  }), [language]);

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 transition-colors duration-500">
      <ScrollProgress />
      
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        isScrolled={isScrolled}
        theme={theme}
        language={language}
        translations={data.translations}
        scrollToSection={handleScrollToSection}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
      />

      <HeroSection 
        translations={data.translations}
        personalData={data.personalData}
      />

      <AboutSection 
        translations={data.translations}
        personalData={data.personalData}
        language={language}
      />

      <ExperienceSection 
        translations={data.translations}
        experienceData={data.experienceData}
        language={language}
      />

      <ProjectsSection 
        translations={data.translations}
        projectsData={data.projectsData}
        language={language}
      />

      <ContactSection 
        translations={data.translations}
        personalData={data.personalData}
        language={language}
      />

      <Footer 
        translations={data.translations}
        personalData={data.personalData}
      />
      
      <FloatingActionButton />
    </div>
  );
};

export default App;