
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';

const designStyles = [
  {
    name: "Minimalist",
    description: "Clean lines, negative space, monochromatic",
    preview: "bg-gradient-to-br from-gray-900 to-gray-800"
  },
  {
    name: "Vibrant",
    description: "Bold colors, dynamic elements, playful typography",
    preview: "bg-gradient-to-br from-pink-500 to-yellow-500"
  },
  {
    name: "Elegant",
    description: "Refined aesthetics, serif typography, subtle details",
    preview: "bg-gradient-to-br from-indigo-900 to-purple-800"
  },
  {
    name: "Futuristic",
    description: "Neon accents, geometric shapes, dark backgrounds",
    preview: "bg-gradient-to-br from-cyan-500 to-blue-700"
  }
];

const LiveEditorSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredStyle, setHoveredStyle] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Simulate AI generating suggestions based on user input
  useEffect(() => {
    if (editorContent.length > 5) {
      const simulatedSuggestions = [
        "Add a gradient background for visual depth",
        "Consider using a sans-serif font for readability",
        "Increase contrast between text and background",
        "Add subtle animations for interactive elements"
      ];
      setSuggestions(simulatedSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [editorContent]);

  return (
    <section
      id="live-editor"
      className="py-24 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-gradient text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Design in Real-Time
          </h2>
          <p className="text-white/70 text-lg md:text-xl">
            Experience the future of design with our AI-powered live editor. See your ideas transform instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 glass-morphism rounded-xl p-6 h-[500px] relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium">Canvas</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-xs border-white/20">
                  Undo
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-white/20">
                  Reset
                </Button>
              </div>
            </div>
            
            <div className={`h-[calc(100%-40px)] rounded-lg border border-white/10 flex items-center justify-center relative ${
              selectedStyle !== null ? designStyles[selectedStyle].preview : 'bg-white/5'
            }`}>
              {selectedStyle === null ? (
                <div className="text-center px-4">
                  <p className="text-white/50 mb-4">Select a design style or start typing to see suggestions</p>
                  <textarea
                    className="w-full max-w-md p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Describe your design idea..."
                    rows={4}
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                  ></textarea>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-white font-medium text-xl">
                    {designStyles[selectedStyle].name} Style
                  </p>
                  <p className="text-white/70 mt-2">
                    {designStyles[selectedStyle].description}
                  </p>
                </div>
              )}
              
              {/* Interactive design elements that appear based on user interaction */}
              {selectedStyle !== null && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-3/4 h-1/2 border border-white/30 rounded-lg"></div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="glass-morphism rounded-xl p-6">
              <h3 className="font-medium mb-4">Design Styles</h3>
              <div className="space-y-3">
                {designStyles.map((style, index) => (
                  <motion.div
                    key={style.name}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedStyle === index
                        ? 'bg-gradient-to-r from-purple-500/40 to-indigo-500/40 border border-white/20'
                        : 'hover:bg-white/5'
                    }`}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    onClick={() => setSelectedStyle(index)}
                    onMouseEnter={() => setHoveredStyle(index)}
                    onMouseLeave={() => setHoveredStyle(null)}
                  >
                    <div className="flex items-center">
                      <div 
                        className={`w-10 h-10 rounded-md mr-3 ${style.preview}`}
                      ></div>
                      <div>
                        <p className="font-medium">{style.name}</p>
                        <p className="text-xs text-white/50">{style.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {suggestions.length > 0 && (
              <div className="glass-morphism rounded-xl p-6">
                <h3 className="font-medium mb-4">AI Suggestions</h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      className="p-3 rounded-lg hover:bg-white/5 cursor-pointer"
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="text-sm">{suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveEditorSection;
