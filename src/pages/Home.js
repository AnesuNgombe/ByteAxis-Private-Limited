import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import {
  BoltIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CpuChipIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { sanityClient, sanityWriteClient } from '../utils/sanityClient';

const Home = () => {
  const imageBase = `${process.env.PUBLIC_URL}/img`;
  const image = (file) => `${imageBase}/${file.split('/').map(encodeURIComponent).join('/')}`;
  const resolveImage = (file) => {
    if (!file) return '';
    if (file.startsWith('http://') || file.startsWith('https://') || file.startsWith('data:')) {
      return file;
    }
    if (file.startsWith('/')) return file;
    return image(file);
  };

  const services = [
    { title: 'Software Development', description: 'Full-stack systems built for scale and compliance.', icon: '🧠' },
    { title: 'Websites & Web Apps', description: 'Marketing sites, portals, and complex web platforms.', icon: '🧩' },
    { title: 'Mobile Applications', description: 'iOS/Android experiences with secure backends.', icon: '📱' },
    { title: 'Internal Systems', description: 'Workflow, inventory, HR, and analytics tools.', icon: '🛰️' },
    { title: 'IT Consulting', description: 'Architecture, security, and digital transformation.', icon: '🧭' },
    { title: 'Business Setup', description: 'Registration, compliance, and launch strategy.', icon: '🚀' },
  ];

  const heroHighlights = [
    { label: 'Future Systems', Icon: CpuChipIcon },
    { label: 'Business Launch', Icon: BuildingOffice2Icon },
    { label: 'Growth Analytics', Icon: ChartBarIcon },
    { label: 'Global Reach', Icon: GlobeAltIcon },
  ];

  const heroOrbits = [
    { label: 'AI-ready stacks', Icon: SparklesIcon, className: 'top-16 left-12', delay: 0 },
    { label: 'Digital markets', Icon: GlobeAltIcon, className: 'top-20 right-24', delay: 0.3 },
    { label: 'Smart ops', Icon: BoltIcon, className: 'bottom-24 left-20', delay: 0.6 },
    { label: 'Launch velocity', Icon: RocketLaunchIcon, className: 'bottom-16 right-16', delay: 0.9 },
  ];

  const projectGalleries = [
    {
      title: 'ByteAxis Client Portal',
      category: 'Authentication',
      cover: 'byteaxis login page.png',
      images: ['byteaxis login page.png'],
    },
    {
      title: 'Mhishi Admin',
      category: 'Internal System',
      cover: 'mhishi/mhishiadmindashboard.png',
      images: ['mhishi/mhishiadmin login.png', 'mhishi/mhishiadmindashboard.png'],
    },
    {
      title: 'Mhishi Lawyer',
      category: 'Client Portal',
      cover: 'mhishi/mhishilawyer dashboard.png',
      images: [
        'mhishi/mhishilawyer login.png',
        'mhishi/mhishilawyer register.png',
        'mhishi/mhishilawyer dashboard.png',
      ],
    },
    {
      title: 'Mhishi Welcome',
      category: 'Onboarding',
      cover: 'mhishi/mhishiwelcome page.png',
      images: ['mhishi/mhishiwelcome page.png'],
    },
    {
      title: 'Tengahub Commerce',
      category: 'E-commerce Suite',
      cover: 'tengahubecommerce home page.png',
      images: [
        'tengahubecommerce home page.png',
        'tengahub hot deal.png',
        'tengahub shopping cart.png',
        'tengahub checkout.png',
        'tengahub contactpage.png',
        'tengahub ordering process.png',
        'tengahub searchbar.png',
        'tengahub sign in.png',
        'tengahub sign up.png',
        'tengahub wishlist.png',
      ],
    },
    {
      title: 'Zimbabwe Legal Library',
      category: 'Membership Platform',
      cover: 'zimbabwelegal library home page.png',
      images: [
        'zimbabwelegal library home page.png',
        'zimbabwelegal library login page.png',
        'zimbabwelegal library sign up.png',
        'zimbabwelegal library premium access.png',
        'zimbabwelegal library welcome page.png',
      ],
    },
    {
      title: 'Simba Welding',
      category: 'Industrial Website',
      cover: 'simba welding welcome page.png',
      images: [
        'simba welding welcome page.png',
        'simba welding about page.png',
        'simba welding contact page.png',
        'simba welding login page.png',
        'simba welding quotation page.png',
      ],
    },
    {
      title: 'Music Player',
      category: 'UI Concepts',
      cover: 'music player dark mode.png',
      images: ['music player dark mode.png', 'music player light mode.png'],
    },
  ];

  const stages = ['Discovery', 'UX & Visuals', 'Build', 'QA & Security', 'Launch', 'Support'];

  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sanityProjects, setSanityProjects] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterInterest, setNewsletterInterest] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ loading: false, error: '', success: '' });

  const currentImage = activeProject ? activeProject.images[activeIndex] : null;

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(_createdAt desc)[0...9]{
          _id,
          title,
          category,
          coverImage{asset->{url}},
          gallery[]{asset->{url}}
        }`;
        const data = await sanityClient.fetch(query);
        const mapped = data.map((item) => {
          const cover = item?.coverImage?.asset?.url;
          const gallery = (item?.gallery || [])
            .map((img) => img?.asset?.url)
            .filter(Boolean);
          const images = gallery.length ? gallery : cover ? [cover] : [];
          return {
            title: item.title,
            category: item.category || 'Project',
            cover: cover || images[0],
            images,
            source: 'sanity',
          };
        }).filter((item) => item.cover);
        if (isMounted) {
          setSanityProjects(mapped);
        }
      } catch (err) {
        if (isMounted) {
          setSanityProjects([]);
        }
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenProject = (project) => {
    setActiveProject(project);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    if (!activeProject) return;
    setActiveIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
  };

  const handleNext = () => {
    if (!activeProject) return;
    setActiveIndex((prev) => (prev + 1) % activeProject.images.length);
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    if (!sanityWriteClient) {
      setNewsletterStatus({ loading: false, error: 'Newsletter is not configured yet.', success: '' });
      return;
    }
    if (!newsletterEmail) {
      setNewsletterStatus({ loading: false, error: 'Please enter an email address.', success: '' });
      return;
    }
    setNewsletterStatus({ loading: true, error: '', success: '' });
    try {
      await sanityWriteClient.create({
        _type: 'newsletterSignup',
        email: newsletterEmail,
        interests: newsletterInterest,
        source: 'home',
        createdAt: new Date().toISOString(),
      });
      setNewsletterEmail('');
      setNewsletterInterest('');
      setNewsletterStatus({ loading: false, error: '', success: 'Thanks for subscribing! We will be in touch.' });
    } catch (err) {
      setNewsletterStatus({ loading: false, error: 'Unable to subscribe right now. Please try again.', success: '' });
    }
  };

  const displayProjects = sanityProjects.length ? sanityProjects : projectGalleries;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden space-background">
        <div className="shooting-star" style={{top: '10%', right: '20%', animationDelay: '0s'}}></div>
        <div className="shooting-star" style={{top: '30%', right: '60%', animationDelay: '2s'}}></div>
        <div className="shooting-star" style={{top: '50%', right: '80%', animationDelay: '4s'}}></div>
        <div className="shooting-star" style={{top: '70%', right: '40%', animationDelay: '6s'}}></div>
        <div className="absolute inset-0 hero-cosmos opacity-90" aria-hidden="true" />
        <div className="absolute -top-24 -right-32 h-[420px] w-[420px] rounded-full hero-sphere blur-2xl" />
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-secondary-500/20 blur-3xl" />
        <div className="absolute top-20 left-10 h-24 w-24 rounded-full bg-ember/20 blur-2xl animate-float" />
        <div className="absolute bottom-10 right-24 h-32 w-32 rounded-full bg-moss/20 blur-2xl animate-float-slow" />

        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {heroOrbits.map((item) => (
            <motion.div
              key={item.label}
              className={`hero-orbit ${item.className}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.55, 1, 0.55], y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: item.delay }}
            >
              <item.Icon className="h-4 w-4 text-primary-600" />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="section-kicker text-white/60">Future-First Studio</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white mt-4">
                Shape the future of business with <span className="text-gradient">ByteAxis</span>
              </h1>
              <p className="text-lg text-white/80 mt-6 max-w-xl">
                We build software, web platforms, mobile apps, and internal systems that help founders launch faster and scale
                smarter. From idea to market, we align strategy, compliance, marketing, and growth.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {heroHighlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="hero-chip"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <item.Icon className="h-4 w-4 text-primary-600" />
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <SignedOut>
                  <Link to="/quotation" className="btn-primary btn-bounce">Get Quotation</Link>
                </SignedOut>
                <Link to="/pricing" className="btn-outline btn-bounce btn-bounce-delay">View Pricing</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="absolute inset-0">
                  <div className="absolute top-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute top-20 right-32 w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-16 left-20 w-1 h-1 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Launch Console</h3>
                      <p className="text-sm text-white/70 mt-1">All services aligned to your business stage</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                      <RocketLaunchIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Product Build', value: 'Web + Mobile', icon: CpuChipIcon, color: 'from-cyan-500/80 to-blue-600/80' },
                      { label: 'Business Setup', value: 'Registration', icon: BuildingOffice2Icon, color: 'from-purple-500/80 to-pink-600/80' },
                      { label: 'IT Consulting', value: 'Strategy', icon: BoltIcon, color: 'from-amber-500/80 to-orange-600/80' },
                      { label: 'Growth', value: 'Ads & Social', icon: ChartBarIcon, color: 'from-green-500/80 to-emerald-600/80' },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl hover:bg-white/10 hover:scale-105 transition-all">
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-xs uppercase tracking-wider text-white/50 font-semibold">{item.label}</p>
                        <p className="text-lg font-bold text-white mt-1">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/90 text-sm font-medium">All Systems Operational</span>
                    </div>
                    <SparklesIcon className="h-5 w-5 text-yellow-300" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full border-2 border-white/20 animate-spin-slow" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-kicker">Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3">Everything you need to launch and scale</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              We blend product engineering with business consulting so your operations, compliance, and digital presence move together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-ink mb-2">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="section-kicker">Business Setup</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3">Launch your business legally and confidently</h2>
            <p className="text-slate-600 mt-4">
              We handle business registration, compliance papers, tax readiness, and market positioning. Our consultants map your
              idea into a viable plan with timelines, costs, and growth channels.
            </p>
            <div className="mt-6 grid gap-4">
              <div className="p-4 rounded-2xl bg-sand border border-slate-200">Business registration packs</div>
              <div className="p-4 rounded-2xl bg-sand border border-slate-200">Compliance & opening documents</div>
              <div className="p-4 rounded-2xl bg-sand border border-slate-200">Branding & social media setup</div>
              <div className="p-4 rounded-2xl bg-sand border border-slate-200">Marketing campaigns + ads</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative h-72 rounded-[32px] bg-ink text-sand overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 rounded-full border border-sand/30 animate-spin-slow" />
                <div className="absolute h-32 w-32 rounded-full border border-primary-500/60 animate-spin-slow" />
                <div className="absolute h-16 w-16 rounded-full bg-secondary-500/70 animate-pulse" />
              </div>
              <div className="relative p-8">
                <p className="text-sm uppercase tracking-widest text-sand/60">Creative Sector</p>
                <h3 className="text-2xl font-semibold mt-3">Business Ideas Engine</h3>
                <p className="text-sand/70 mt-2">We translate your idea into a structured MVP and launch plan.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="section-kicker">Portfolio</p>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3">Project galleries you can explore</h2>
            </div>
            <Link to="/services" className="btn-outline">See Services</Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayProjects.map((item, index) => (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleOpenProject(item)}
                className="text-left bg-white rounded-3xl shadow-deep overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={resolveImage(item.cover)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-sand text-sm font-semibold">View Gallery</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-slate-400">{item.category}</p>
                  <h3 className="text-xl font-semibold text-ink mt-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-2">{item.images.length} screens</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="section-kicker">Newsletter</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3">Stay ahead of the future</h2>
            <p className="text-slate-600 mt-4 max-w-xl">
              Get new product launches, growth playbooks, and curated tech insights designed for founders and business teams.
            </p>
            <div className="mt-6 grid gap-4">
              <div className="p-4 rounded-2xl bg-sand border border-slate-200">Monthly product trends + pricing updates</div>
              <div className="p-4 rounded-2xl bg-sand border border-slate-200">Launch checklists and growth templates</div>
            </div>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="bg-sand rounded-3xl p-8 shadow-deep space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Work Email</label>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="you@company.com"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Focus Area</label>
              <input
                type="text"
                value={newsletterInterest}
                onChange={(event) => setNewsletterInterest(event.target.value)}
                placeholder="e.g., SaaS build, mobile app, business setup"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {newsletterStatus.error && (
              <div className="text-sm text-ember bg-ember/10 border border-ember/20 rounded-2xl px-4 py-3">
                {newsletterStatus.error}
              </div>
            )}
            {newsletterStatus.success && (
              <div className="text-sm text-moss bg-moss/10 border border-moss/20 rounded-2xl px-4 py-3">
                {newsletterStatus.success}
              </div>
            )}

            <button type="submit" className="btn-primary w-full" disabled={newsletterStatus.loading}>
              {newsletterStatus.loading ? 'Joining...' : 'Join the Newsletter'}
            </button>
            <p className="text-xs text-slate-500 text-center">
              We respect your inbox. Expect thoughtful updates, not spam.
            </p>
          </form>
        </div>
      </section>

      <section className="py-20 bg-ink text-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-kicker text-sand/60">Delivery Stages</p>
              <h2 className="text-3xl md:text-4xl font-bold text-sand mt-3">Stage-by-stage execution</h2>
              <p className="text-sand/70 mt-4">
                Every service includes structured phases to keep cost, scope, and timeline fully transparent.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {stages.map((stage, index) => (
                <div key={stage} className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <p className="text-sm text-sand/60">Stage {index + 1}</p>
                  <p className="text-lg font-semibold">{stage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ink">Ready for an instant, VAT-ready quotation?</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Generate a complete quote with hosting, domain, email, development stages, and business setup services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <SignedOut>
              <Link to="/quotation" className="btn-primary">Generate Quotation</Link>
            </SignedOut>
            <SignedIn>
              <Link to="/pricing" className="btn-primary">View Pricing</Link>
            </SignedIn>
            <Link to="/contact" className="btn-outline">Talk to us</Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="bg-white w-full max-w-5xl rounded-3xl shadow-deep p-6 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="section-kicker">Project Gallery</p>
                  <h3 className="text-2xl font-semibold text-ink mt-2">{activeProject.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {activeProject.category} • {activeProject.images.length} screens
                  </p>
                </div>
                <button type="button" className="btn-outline" onClick={() => setActiveProject(null)}>
                  Close
                </button>
              </div>
              <div className="mt-6">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-sand">
                  {currentImage && (
                    <img
                      src={resolveImage(currentImage)}
                      alt={`${activeProject.title} ${currentImage}`}
                      className="w-full max-h-[60vh] object-contain bg-sand"
                    />
                  )}
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeProject.images.length < 2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center shadow-lg hover:bg-white disabled:opacity-40"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-ink" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={activeProject.images.length < 2}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center shadow-lg hover:bg-white disabled:opacity-40"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-ink" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-sm text-slate-500">
                  <span>
                    Image {activeIndex + 1} of {activeProject.images.length}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={activeProject.images.length < 2}
                      className="btn-outline py-2 px-4 disabled:opacity-40"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={activeProject.images.length < 2}
                      className="btn-outline py-2 px-4 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-4 gap-3 mt-4 max-h-[28vh] overflow-y-auto pr-1">
                  {activeProject.images.map((file, index) => (
                    <button
                      key={file}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-2xl overflow-hidden border ${
                        index === activeIndex ? 'border-primary-500 ring-2 ring-primary-200' : 'border-slate-200'
                      }`}
                    >
                      <img src={resolveImage(file)} alt={`${activeProject.title} ${file}`} className="w-full h-24 object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
