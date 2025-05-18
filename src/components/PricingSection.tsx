
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckIcon } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$19",
    description: "Perfect for individuals and small projects",
    features: [
      "AI design suggestions",
      "10 projects",
      "Basic templates",
      "Export to PNG, JPG",
      "Community support"
    ]
  },
  {
    name: "Pro",
    price: "$49",
    description: "For professionals and growing teams",
    features: [
      "Everything in Starter",
      "Unlimited projects",
      "Advanced templates",
      "Export to all formats",
      "Priority support",
      "Team collaboration",
      "Version history"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with specific needs",
    features: [
      "Everything in Pro",
      "Custom templates",
      "Dedicated support",
      "API access",
      "Advanced security",
      "Team training",
      "Usage analytics"
    ]
  }
];

const PricingSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-gradient text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-white/70 text-lg md:text-xl">
            Choose the plan that works best for you or your team. All plans include core features.
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <motion.div
              className="bg-white/5 p-1 rounded-full flex"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly <span className="text-xs opacity-75">Save 20%</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`glass-morphism rounded-xl p-8 relative ${
                tier.popular ? 'md:transform md:-translate-y-4' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {tier.price}{billingCycle === 'yearly' && tier.price !== 'Custom' ? '9' : ''}
                  </span>
                  {tier.price !== 'Custom' && <span className="text-white/70 ml-2">/month</span>}
                </div>
                <p className="text-sm text-white/70 mt-2">{tier.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Removed all buttons here */}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 filter blur-3xl" />
    </section>
  );
};

export default PricingSection;
