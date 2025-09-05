import { useState, useEffect, useCallback } from 'react';
import { smoothScrollTo } from '../utils/animations';
import { throttle } from '../utils/performance';
import { updateMetaTags, getMetaDataForSection } from '../utils/metaUpdater';
import { SCROLL_THRESHOLD } from '../constants';

export const useScrollTracking = (language: string = 'en') => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > SCROLL_THRESHOLD);
    
    // Update active section based on scroll position
    const sections = ['home', 'about', 'experience', 'projects', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    
    if (current && current !== activeSection) {
      setActiveSection(current);
      
      // Update meta tags when section changes
      const metaData = getMetaDataForSection(current, language);
      updateMetaTags(metaData);
    }
  }, [activeSection, language]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16); // ~60fps

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId: string) => {
    smoothScrollTo(sectionId);
  }, []);

  return { activeSection, isScrolled, scrollToSection };
};