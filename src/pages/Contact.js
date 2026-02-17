import React from 'react';
import { motion } from 'framer-motion';
import { COMPANY, getTelLink, getWhatsAppLink } from '../utils/company';

const Contact = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="section-kicker">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mt-3">Let’s talk about your next move</h1>
          <p className="text-lg text-slate-600 mt-4">
            From first idea to full launch, we’ll build the right system and business setup for you.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-semibold text-ink mb-4">Direct Lines</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400">VOIP</p>
                <a className="text-lg font-semibold text-ink" href={getTelLink(COMPANY.voip)}>
                  {COMPANY.voip}
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400">WhatsApp</p>
                <a className="text-lg font-semibold text-ink" href={getWhatsAppLink()}>
                  {COMPANY.whatsapp}
                </a>
              </div>
              <p className="text-sm text-slate-500">
                We reply fast on WhatsApp for estimates, timelines, and onboarding steps.
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="p-4 rounded-2xl bg-sand border border-slate-200">
                <p className="text-sm text-slate-500">Business setup support</p>
                <p className="text-lg font-semibold text-ink">Registration, compliance, and launch kits</p>
              </div>
              <div className="p-4 rounded-2xl bg-sand border border-slate-200">
                <p className="text-sm text-slate-500">Systems delivery</p>
                <p className="text-lg font-semibold text-ink">Web apps, mobile apps, internal tools</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-deep p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Service Needed</label>
              <select className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500">
                <option>Web & Mobile Development</option>
                <option>Internal Systems</option>
                <option>Business Registration</option>
                <option>IT Consulting</option>
                <option>Marketing & Ads</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Project Brief</label>
              <textarea
                rows={4}
                placeholder="Tell us about your idea, goals, and timeline"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button type="button" className="btn-primary w-full">Send Request</button>
            <p className="text-xs text-slate-500">
              Submitting sends your details to our team. We respond with a proposal and a VAT-ready quotation.
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
