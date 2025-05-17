
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      className="glass-morphism rounded-xl p-8 h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: delay }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className="mb-6 p-3 w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border border-purple-500/20">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const features = [
  {
    title: "AI-Powered Design",
    description: "Our cutting-edge AI analyzes your preferences to suggest designs that align perfectly with your brand identity.",
    icon: "✨",
  },
  {
    title: "Real-time Collaboration",
    description: "Work seamlessly with your team in real-time, with changes reflected instantly across all devices.",
    icon: "👥",
  },
  {
    title: "Smart Templates",
    description: "Access hundreds of professionally designed templates that adapt to your content automatically.",
    icon: "📐",
  },
  {
    title: "Adaptive Interface",
    description: "Our interface learns from your workflow, offering personalized suggestions to enhance productivity.",
    icon: "🧠",
  },
  {
    title: "Design History",
    description: "Access every version of your design with our intelligent history management system.",
    icon: "⏱️",
  },
  {
    title: "Export Anywhere",
    description: "Export your designs in any format for seamless integration with your existing tools and platforms.",
    icon: "🚀",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-gradient text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Redefine What's Possible</h2>
          <p className="text-white/70 text-lg md:text-xl">
            Aesthetic combines advanced AI technology with intuitive design principles to transform how you create.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-purple-600/10 filter blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-indigo-600/10 filter blur-3xl" />
    </section>
  );
};

export default FeaturesSection;
