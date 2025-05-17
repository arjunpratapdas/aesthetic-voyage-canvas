
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, we would apply the theme change to the document
    // For this demo, we're just toggling the state
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-morphism py-3' : 'py-6'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <motion.div 
            className="text-2xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Aesthetic
          </motion.div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {['Features', 'Pricing', 'Testimonials'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Toggle 
            className="bg-white/10 hover:bg-white/20 rounded-full p-2"
            pressed={isDarkMode}
            onPressedChange={toggleTheme}
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </Toggle>
          
          <Button 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full px-6 hover:opacity-90 transition-opacity"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
