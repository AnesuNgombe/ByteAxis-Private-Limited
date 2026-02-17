import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDaysIcon,
  ClockIcon,
  SparklesIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';

const Blog = () => {
  const imageBase = `${process.env.PUBLIC_URL}/img`;
  const image = (file) => `${imageBase}/${file.split('/').map(encodeURIComponent).join('/')}`;

  const featured = {
    title: 'Building Future-Ready Commerce Platforms',
    category: 'E-commerce',
    date: 'Feb 3, 2026',
    readTime: '7 min read',
    image: 'tengahubecommerce home page.png',
    excerpt: 'How we structure discovery, UI, and backend performance so commerce brands scale without friction.',
  };

  const posts = [
    {
      title: 'Designing a Client Portal That Feels Instant',
      category: 'Client Experience',
      date: 'Jan 29, 2026',
      readTime: '5 min read',
      image: 'mhishi/mhishilawyer dashboard.png',
      excerpt: 'Micro-interactions, auth flows, and dashboards that make clients feel in control.',
    },
    {
      title: 'From Paperwork to Platform: Digitizing Compliance',
      category: 'Legal Tech',
      date: 'Jan 22, 2026',
      readTime: '6 min read',
      image: 'zimbabwelegal library home page.png',
      excerpt: 'A practical blueprint for membership platforms, premium access, and secure content delivery.',
    },
    {
      title: 'The Internal Ops Stack Every Founder Needs',
      category: 'Operations',
      date: 'Jan 15, 2026',
      readTime: '4 min read',
      image: 'mhishi/mhishiadmindashboard.png',
      excerpt: 'Dashboards that surface the right KPIs, workflows that keep teams aligned, and automation that scales.',
    },
    {
      title: 'Industrial Brands Can Look Premium Online',
      category: 'Brand & Web',
      date: 'Jan 8, 2026',
      readTime: '5 min read',
      image: 'simba welding about page.png',
      excerpt: 'Modern UI, strong messaging, and lead-driven layouts for blue-collar businesses.',
    },
    {
      title: 'Music Player UI: The Power of Motion',
      category: 'UI Concepts',
      date: 'Dec 30, 2025',
      readTime: '3 min read',
      image: 'music player dark mode.png',
      excerpt: 'Why motion clarity and high-contrast layout choices increase retention and delight.',
    },
    {
      title: 'Why Authentication Should Feel Effortless',
      category: 'Product UX',
      date: 'Dec 20, 2025',
      readTime: '4 min read',
      image: 'byteaxis login page.png',
      excerpt: 'Lightweight forms, trust signals, and UX patterns that reduce drop-off.',
    },
  ];

  const guides = [
    {
      title: 'Founder Launch Checklist',
      description: 'A step-by-step checklist covering company setup, compliance, and go-to-market execution.',
      icon: SparklesIcon,
    },
    {
      title: 'Revenue-Ready Product Roadmap',
      description: 'Plan MVP delivery, iteration cycles, and analytics from day one.',
      icon: ChartBarIcon,
    },
    {
      title: 'Compliance Without Drag',
      description: 'How to keep legal, VAT, and regulatory steps from slowing your launch.',
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden hero-sheen grid-noise">
        <div className="absolute inset-0 hero-future opacity-60" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="section-kicker">Blog</p>
            <h1 className="text-4xl md:text-5xl font-bold text-ink mt-4">ByteAxis Journal</h1>
            <p className="text-lg text-slate-600 mt-4">
              Stories, playbooks, and strategy for founders building future-ready businesses and digital products.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-deep overflow-hidden"
          >
            <div className="relative h-72 lg:h-full">
              <img src={image(featured.image)} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>
            <div className="p-8">
              <p className="section-kicker">Featured</p>
              <h2 className="text-3xl font-semibold text-ink mt-3">{featured.title}</h2>
              <p className="text-slate-600 mt-4">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-4">
                <span className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-primary-600" />
                  {featured.date}
                </span>
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-primary-600" />
                  {featured.readTime}
                </span>
                <span className="px-3 py-1 rounded-full bg-sand text-ink font-semibold">{featured.category}</span>
              </div>
              <button type="button" className="btn-primary mt-6">Read Story</button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="section-kicker">Latest</p>
              <h2 className="text-3xl font-bold text-ink mt-3">Latest stories</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-3xl shadow-deep overflow-hidden"
              >
                <img src={image(post.image)} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-slate-400">{post.category}</p>
                  <h3 className="text-xl font-semibold text-ink mt-2">{post.title}</h3>
                  <p className="text-sm text-slate-600 mt-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-4">
                    <span className="flex items-center gap-2">
                      <CalendarDaysIcon className="h-4 w-4 text-primary-600" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-primary-600" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-kicker">Playbooks</p>
            <h2 className="text-3xl font-bold text-ink mt-3">Founder-ready guides</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Practical resources you can use immediately to shape your next launch.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="card"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{guide.title}</h3>
                  <p className="text-slate-600 mt-3">{guide.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ink">Want tailored insights for your launch?</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Join our founders list for new playbooks, project breakdowns, and strategy updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button type="button" className="btn-primary">Join the Journal</button>
            <button type="button" className="btn-outline">Request a Strategy Call</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
