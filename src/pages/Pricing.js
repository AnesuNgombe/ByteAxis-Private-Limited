import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { CheckIcon, SparklesIcon, RocketLaunchIcon, BuildingStorefrontIcon, CpuChipIcon, ServerIcon, BriefcaseIcon, MegaphoneIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Pricing = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const websitePlans = [
    {
      name: "Starter",
      icon: SparklesIcon,
      price: "950",
      description: "Perfect for portfolios & small businesses",
      popular: false,
      features: [
        "Up to 5 pages",
        "Mobile responsive design",
        "Contact form integration",
        "Basic SEO optimization",
        "2 rounds of revisions",
        "30 days support"
      ]
    },
    {
      name: "Growth",
      icon: RocketLaunchIcon,
      price: "1,850",
      description: "For growing service businesses",
      popular: true,
      features: [
        "Up to 12 pages",
        "Custom UI/UX design",
        "Google Analytics setup",
        "Lead capture forms",
        "CMS integration",
        "3 rounds of revisions",
        "90 days support"
      ]
    },
    {
      name: "Commerce",
      icon: BuildingStorefrontIcon,
      price: "3,200",
      description: "Full e-commerce solution",
      popular: false,
      features: [
        "Unlimited pages",
        "Online store setup",
        "Payment gateway integration",
        "Inventory management",
        "Marketing pixels",
        "Advanced SEO",
        "Unlimited revisions",
        "6 months support"
      ]
    }
  ];

  const webAppStages = [
    { stage: "Discovery & Architecture", cost: "350 - 700", icon: "🔍", desc: "Requirements gathering & system design" },
    { stage: "UX/UI Design", cost: "600 - 1,200", icon: "🎨", desc: "User flows, wireframes & visual design" },
    { stage: "Development", cost: "2,000 - 6,500", icon: "⚡", desc: "Frontend & backend implementation" },
    { stage: "QA & Security", cost: "450 - 1,200", icon: "🛡️", desc: "Testing, bug fixes & security audit" },
    { stage: "Launch & Training", cost: "300 - 900", icon: "🚀", desc: "Deployment & team onboarding" },
  ];

  const addOns = [
    {
      category: "Infrastructure",
      icon: ServerIcon,
      color: "bg-blue-50 text-blue-600",
      items: [
        { name: "Domain registration", price: "25", period: "year" },
        { name: "Business email (5 inboxes)", price: "120", period: "year" },
        { name: "Hosting + SSL + backups", price: "180", period: "year" },
        { name: "Maintenance & monitoring", price: "250", period: "month" },
      ]
    },
    {
      category: "Business Services",
      icon: BriefcaseIcon,
      color: "bg-purple-50 text-purple-600",
      items: [
        { name: "Business registration pack", price: "150", period: "once" },
        { name: "Compliance & legal papers", price: "200", period: "once" },
        { name: "Business setup workshop", price: "180", period: "session" },
        { name: "IT consulting", price: "90", period: "hour" },
        { name: "Business consulting", price: "120", period: "hour" },
      ]
    },
    {
      category: "Marketing & Growth",
      icon: MegaphoneIcon,
      color: "bg-orange-50 text-orange-600",
      items: [
        { name: "Social media setup", price: "120", period: "once" },
        { name: "Branding starter kit", price: "220", period: "once" },
        { name: "Ads campaign setup", price: "180", period: "once" },
        { name: "Monthly ad management", price: "250+", period: "month" },
      ]
    }
  ];

  const faqs = [
    { q: "Do you offer payment plans?", a: "Yes! We offer flexible payment plans with 30-50% upfront and the rest in milestones." },
    { q: "Is VAT included in these prices?", a: "No, all prices are base rates. 15% VAT will be added to your final quotation." },
    { q: "What's included in support?", a: "Bug fixes, minor content updates, and technical assistance during the support period." },
    { q: "Can I upgrade my plan later?", a: "Absolutely! You can upgrade anytime and we'll credit your initial investment." },
    { q: "Do you provide hosting?", a: "Yes, we offer managed hosting or can deploy to your preferred provider." },
  ];

  return (
    <div className="min-h-screen py-16 hero-sheen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="section-kicker">Pricing</p>
          <h1 className="text-5xl md:text-6xl font-bold text-ink mt-4 mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All packages include professional design, development, and support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {websitePlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-3xl shadow-deep p-8 hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-4 ring-primary-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl ${plan.popular ? 'bg-primary-100' : 'bg-slate-100'}`}>
                  <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-primary-600' : 'text-slate-600'}`} />
                </div>
                <h3 className="text-2xl font-bold text-ink">{plan.name}</h3>
              </div>
              <p className="text-slate-600 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-ink">${plan.price}</span>
                <span className="text-slate-500 ml-2">one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <SignedIn>
                <Link to="/quotation" className={`btn-primary w-full text-center block ${plan.popular ? '' : 'btn-secondary'}`}>
                  Get Started
                </Link>
              </SignedIn>
              <SignedOut>
                <Link to="/auth" className={`btn-primary w-full text-center block ${plan.popular ? '' : 'btn-secondary'}`}>
                  Get Started
                </Link>
              </SignedOut>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-2 rounded-full mb-4">
              <CpuChipIcon className="h-5 w-5" />
              <span className="font-semibold">Custom Web Applications</span>
            </div>
            <h2 className="text-4xl font-bold text-ink mb-4">Stage-Based Development</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              For complex web apps, SaaS platforms, and internal systems. Pay as you progress through each stage.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {webAppStages.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white rounded-3xl shadow-deep p-6 hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-3">{stage.icon}</div>
                <h3 className="font-bold text-ink mb-2">{stage.stage}</h3>
                <p className="text-xs text-slate-500 mb-4">{stage.desc}</p>
                <div className="text-2xl font-bold text-primary-600">${stage.cost}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ink mb-4">Add-Ons & Services</h2>
            <p className="text-lg text-slate-600">Everything you need to launch and grow your business</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {addOns.map((addon, i) => (
              <motion.div
                key={addon.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="bg-white rounded-3xl shadow-deep p-8"
              >
                <div className={`inline-flex items-center gap-2 ${addon.color} px-4 py-2 rounded-full mb-6`}>
                  <addon.icon className="h-5 w-5" />
                  <span className="font-semibold">{addon.category}</span>
                </div>
                <div className="space-y-4">
                  {addon.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-slate-700 font-medium">{item.name}</p>
                        <p className="text-xs text-slate-400">per {item.period}</p>
                      </div>
                      <span className="text-lg font-bold text-ink">${item.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ink mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.05 }}
                className="bg-white rounded-2xl shadow-deep overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span className="font-semibold text-ink">{faq.q}</span>
                  <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-slate-600"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }} className="bg-gradient-to-br from-ink via-primary-900 to-purple-900 text-white rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to start your project?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Get a detailed quotation with VAT breakdown in minutes. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignedIn>
              <Link to="/quotation" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
                <SparklesIcon className="h-5 w-5" />
                Generate Quotation
              </Link>
            </SignedIn>
            <SignedOut>
              <Link to="/auth" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
                <SparklesIcon className="h-5 w-5" />
                Sign In to Start
              </Link>
            </SignedOut>
            <Link to="/contact" className="btn-outline border-2 border-white/30 text-white hover:bg-white/10 inline-flex text-lg px-8 py-4">
              Talk to Our Team
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-6">💡 All prices exclude 15% VAT • Flexible payment plans available</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
