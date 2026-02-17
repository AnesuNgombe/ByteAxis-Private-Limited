import React from 'react';
import { motion } from 'framer-motion';
import {
  BuildingOffice2Icon,
  GlobeAltIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';

const About = () => {
  const imageBase = `${process.env.PUBLIC_URL}/img`;
  const image = (file) => `${imageBase}/${file.split('/').map(encodeURIComponent).join('/')}`;

  const stats = [
    { label: 'Projects Delivered', value: '45+' },
    { label: 'Industries Served', value: '12' },
    { label: 'Avg Launch Time', value: '6-10 weeks' },
    { label: 'Client Retention', value: '92%' },
  ];

  const values = [
    {
      title: 'Future-Ready Execution',
      detail: 'We engineer systems with scalability, security, and resilience from day one.',
      icon: RocketLaunchIcon,
    },
    {
      title: 'Business-First Strategy',
      detail: 'Every product decision ties back to revenue, operations, and customer outcomes.',
      icon: BuildingOffice2Icon,
    },
    {
      title: 'Compliance + Trust',
      detail: 'We keep VAT, legal, and regulatory requirements aligned with your build.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Global Market Mindset',
      detail: 'We build for cross-border growth, international audiences, and multi-channel reach.',
      icon: GlobeAltIcon,
    },
  ];

  const milestones = [
    { year: '2025', title: 'Founded ByteAxis', detail: 'Launched the studio to unify software delivery and business setup.' },
    { year: '2025', title: 'First Enterprise Systems', detail: 'Delivered internal dashboards and compliance-ready platforms.' },
    { year: '2026', title: 'Launch Studio Expansion', detail: 'Introduced end-to-end strategy, marketing, and growth services.' },
    { year: '2026', title: 'AI Workflow Layer', detail: 'Added AI-assisted quoting and project summarization.' },
  ];

  const teamMembers = [];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden hero-sheen grid-noise">
        <div className="absolute inset-0 hero-future opacity-60" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="section-kicker">About</p>
            <h1 className="text-4xl md:text-5xl font-bold text-ink mt-4">We build future-ready businesses</h1>
            <p className="text-lg text-slate-600 mt-4">
              Founded in 2025, ByteAxis exists to help founders launch with confidence, clarity, and systems that scale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="section-kicker">Our Story</p>
            <h2 className="text-3xl font-bold text-ink mt-3">From concept to launch, in one studio</h2>
            <p className="text-slate-600 mt-4">
              We saw founders juggling separate teams for software, registration, compliance, and marketing. ByteAxis brings it all
              into one launch studio, so your technology and business strategy move together.
            </p>
            <p className="text-slate-600 mt-4">
              Our teams deliver internal systems, customer-facing platforms, and growth infrastructure that unlock revenue and
              operational clarity.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl overflow-hidden shadow-deep">
              <img src={image('mhishi/mhishiwelcome page.png')} alt="ByteAxis project preview" className="w-full h-80 object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-3xl shadow-deep p-6 text-center">
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-kicker">Values</p>
            <h2 className="text-3xl font-bold text-ink mt-3">How we work</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="card"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{value.title}</h3>
                  <p className="text-slate-600 mt-3">{value.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-ink text-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-kicker text-sand/60">Milestones</p>
            <h2 className="text-3xl font-bold text-sand mt-3">Our journey so far</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="p-6 rounded-3xl bg-white/10 border border-white/10">
                <p className="text-sm text-sand/60">{milestone.year}</p>
                <h3 className="text-xl font-semibold mt-2">{milestone.title}</h3>
                <p className="text-sand/70 mt-3">{milestone.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-kicker">Team</p>
            <h2 className="text-3xl font-bold text-ink mt-3">Meet the team</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              We are a small, senior team of engineers, strategists, and launch specialists.
            </p>
          </div>
          {teamMembers.length === 0 ? (
            <div className="p-10 rounded-3xl bg-sand border border-slate-200 text-center">
              <SparklesIcon className="h-8 w-8 text-primary-600 mx-auto" />
              <p className="text-slate-600 mt-3">Team profiles will be added here once confirmed.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-white rounded-3xl shadow-deep overflow-hidden">
                  <img src={image(member.photo)} alt={member.name} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-ink">{member.name}</h3>
                    <p className="text-sm text-slate-500 mt-2">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
