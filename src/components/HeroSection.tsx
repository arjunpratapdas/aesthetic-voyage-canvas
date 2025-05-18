
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxItems = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      parallaxItems.current.forEach((el, i) => {
        const depth = i * 0.1 + 0.1;
        const moveX = x * depth * 50;
        const moveY = y * depth * 50;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20" ref={containerRef}>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/20 to-background z-0" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/20 filter blur-3xl animate-pulse-slow" 
             ref={(el) => el && parallaxItems.current.push(el)} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/20 filter blur-3xl animate-pulse-slow" 
             ref={(el) => el && parallaxItems.current.push(el)} />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Design with AI.
          <br />
          <span className="text-gradient-purple">Reimagined.</span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Aesthetic combines cutting-edge AI with intuitive design tools to transform your creative process. Experience design that adapts to you.
        </motion.p>

        {/* Get Started button removed */}
      </div>

      <motion.div 
        className="mt-16 sm:mt-24 relative w-full max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        ref={(el) => el && parallaxItems.current.push(el)}
      >
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full glass-morphism rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-tr from-purple-500/10 to-indigo-500/10">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                    alt="AI Design Interface" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/30 backdrop-blur-md p-4 rounded-lg flex items-center">
                      <Image className="mr-2" size={24} />
                      <span className="text-xl text-white">AI Design Assistant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
