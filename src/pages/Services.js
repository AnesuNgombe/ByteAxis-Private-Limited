import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import {
  BoltIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  LifebuoyIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';

const Services = () => {
  const services = [
    {
      title: "Websites & Web Applications",
      description: "From landing pages to complex client portals with secure authentication.",
      features: ["UX/UI Design", "React Frontend", "Spring-Ready APIs", "CMS or Admin Panels"],
      price: "Starting packages from $950",
      icon: GlobeAltIcon,
      accent: "from-primary-500/20 to-primary-600/10"
    },
    {
      title: "Mobile Applications",
      description: "Native-level experiences for iOS and Android with unified backend services.",
      features: ["Cross-platform build", "Push notifications", "App store prep", "API integration"],
      price: "Starting packages from $3,500",
      icon: DevicePhoneMobileIcon,
      accent: "from-secondary-500/30 to-secondary-600/10"
    },
    {
      title: "Internal Systems",
      description: "Dashboards, HR tools, inventory systems, and custom workflows.",
      features: ["Role-based access", "Data dashboards", "Automation", "Analytics"],
      price: "Starting packages from $2,500",
      icon: ChartBarIcon,
      accent: "from-moss/30 to-moss/10"
    },
    {
      title: "Software Development",
      description: "Custom software tailored to your operational model.",
      features: ["Architecture design", "Database modeling", "Testing & QA", "Deployment"],
      price: "Discovery workshop + scoped proposal",
      icon: CpuChipIcon,
      accent: "from-primary-500/30 to-ink/5"
    },
    {
      title: "IT Consulting",
      description: "Strategic guidance for security, infrastructure, and transformation.",
      features: ["System audits", "Cloud strategy", "Security review", "Optimization"],
      price: "Hourly or retainer options",
      icon: ShieldCheckIcon,
      accent: "from-ember/20 to-ember/5"
    },
    {
      title: "Business Registration & Setup",
      description: "We handle paperwork, compliance, and operational readiness.",
      features: ["Registration docs", "Opening papers", "Operational checklist", "Business ideas coaching"],
      price: "Starter packs from $150",
      icon: BuildingOffice2Icon,
      accent: "from-secondary-500/20 to-sand"
    },
    {
      title: "Business Consulting",
      description: "Revenue model design, pricing strategy, and execution plan.",
      features: ["Business model canvas", "Launch timeline", "Financial projections", "Go-to-market plan"],
      price: "Engagement-based",
      icon: BoltIcon,
      accent: "from-primary-600/20 to-primary-600/5"
    },
    {
      title: "Digital Marketing & Growth",
      description: "Social media pages, paid ads, and brand activation.",
      features: ["Social pages setup", "Ad boosting", "Creative direction", "Lead funnel setup"],
      price: "Monthly campaigns from $180",
      icon: RocketLaunchIcon,
      accent: "from-secondary-500/20 to-ember/10"
    },
    {
      title: "Hosting & Support",
      description: "Domains, email, hosting, and ongoing maintenance.",
      features: ["Domain registration", "Business email", "SSL & backups", "Monitoring"],
      price: "Bundles from $25/month",
      icon: LifebuoyIcon,
      accent: "from-steel/30 to-steel/10"
    },
  ];

  const stages = [
    { title: "Discovery", detail: "Business goals, constraints, and technical plan." },
    { title: "Design", detail: "Wireframes, UI direction, and approval." },
    { title: "Build", detail: "Frontend + backend implementation with weekly demos." },
    { title: "QA", detail: "Testing, security checks, and performance tuning." },
    { title: "Launch", detail: "Deployment, training, and documentation." },
    { title: "Support", detail: "Maintenance, growth, and feature updates." },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="section-kicker">Services</p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mt-4">Everything your business needs</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
            We combine software engineering with business strategy, registration, compliance, and marketing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="card group"
            >
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-ink">{service.title}</h3>
              <p className="text-slate-600 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-5 text-sm text-slate-600">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <span className="text-primary-600 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-200 pt-4 text-primary-700 font-semibold">{service.price}</div>
            </motion.div>
            );
          })}
        </div>

        <div className="mt-20 bg-white rounded-3xl shadow-deep p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="section-kicker">Process</p>
              <h2 className="text-3xl font-bold text-ink mt-3">Stage-by-stage delivery</h2>
              <p className="text-slate-600 mt-4">
                Every engagement follows the same structured roadmap to keep delivery predictable.
              </p>
            </div>
            <SignedOut>
              <Link to="/quotation" className="btn-primary">Get a Quote</Link>
            </SignedOut>
            <SignedIn>
              <Link to="/pricing" className="btn-primary">View Pricing</Link>
            </SignedIn>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {stages.map((stage, index) => (
              <div key={stage.title} className="p-5 rounded-2xl border border-slate-200 bg-sand">
                <p className="text-xs uppercase tracking-widest text-slate-400">Stage {index + 1}</p>
                <h3 className="text-lg font-semibold text-ink mt-2">{stage.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{stage.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
