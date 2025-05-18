
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CallToAction = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-purple-900/20 to-background z-0" />
      </div>

      <motion.div 
        className="container mx-auto px-4 max-w-5xl z-10 relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="glass-morphism rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Background blobs */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-purple-600/20 filter blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl" />
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative z-10 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Ready to Transform Your Desi<span className="inline-block">g</span>n Process?
          </motion.h2>
          
          <motion.p 
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Join thousands of designers and teams who are already using Aesthetic to create stunning designs in a fraction of the time.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
