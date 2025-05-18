
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full text-center md:text-left"
          >
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Aesthetic AI. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
