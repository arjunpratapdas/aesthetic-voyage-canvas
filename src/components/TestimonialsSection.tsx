
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    company: "DesignHub",
    content: "Aesthetic has transformed our design workflow. The AI suggestions are genuinely helpful and have saved our team countless hours of iteration.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Product Designer",
    company: "Innovative Co",
    content: "I've tried many design tools, but nothing comes close to the intuitive experience that Aesthetic provides. It feels like having a design assistant by my side.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "UI/UX Lead",
    company: "TechVision",
    content: "The way Aesthetic adapts to my design style is incredible. It's like it reads my mind and suggests exactly what I'm looking for before I even know it.",
    avatar: "ER",
  },
  {
    name: "David Kim",
    role: "Freelance Designer",
    company: "Self-employed",
    content: "As a freelancer, Aesthetic has become my secret weapon. I can produce high-quality designs faster than ever, which has allowed me to take on more clients.",
    avatar: "DK",
  },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-purple-600/10 filter blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-indigo-600/10 filter blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-gradient text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Loved by Designers
          </h2>
          <p className="text-white/70 text-lg md:text-xl">
            See what creative professionals are saying about their experience with Aesthetic.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-morphism rounded-xl p-8 md:p-12 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xl font-bold">
                  {testimonials[activeTestimonial].avatar}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{testimonials[activeTestimonial].name}</h3>
                <p className="text-white/70">
                  {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                </p>
              </div>
            </div>
            
            <motion.blockquote
              key={activeTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl leading-relaxed text-white/80 italic"
            >
              "{testimonials[activeTestimonial].content}"
            </motion.blockquote>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTestimonial === index
                    ? 'bg-purple-500 w-6'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
