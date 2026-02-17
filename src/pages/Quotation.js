import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { generateAiSummary } from '../utils/aiClient';
import { sanityWriteClient } from '../utils/sanityClient';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const VAT_RATE = 0.15;

const Quotation = () => {
  const [projectName, setProjectName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [selected, setSelected] = useState({});
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const quoteCatalog = [
    { id: 'website', label: 'Business website (5-7 pages)', price: 950, category: 'Websites' },
    { id: 'webapp', label: 'Web application MVP', price: 3500, category: 'Web Apps' },
    { id: 'mobile', label: 'Mobile app (iOS + Android)', price: 4500, category: 'Mobile' },
    { id: 'internal', label: 'Internal system / dashboard', price: 2800, category: 'Internal Systems' },
    { id: 'ecommerce', label: 'E-commerce store setup', price: 3200, category: 'Websites' },
    { id: 'branding', label: 'Brand identity starter kit', price: 220, category: 'Business Setup' },
    { id: 'registration', label: 'Business registration pack', price: 150, category: 'Business Setup' },
    { id: 'compliance', label: 'Compliance & opening papers', price: 200, category: 'Business Setup' },
    { id: 'social', label: 'Social media business pages', price: 120, category: 'Marketing' },
    { id: 'ads', label: 'Ads boosting setup', price: 180, category: 'Marketing' },
    { id: 'domain', label: 'Domain registration (annual)', price: 25, category: 'Hosting' },
    { id: 'hosting', label: 'Hosting + SSL + backups (annual)', price: 180, category: 'Hosting' },
    { id: 'email', label: 'Business email hosting (annual)', price: 120, category: 'Hosting' },
    { id: 'maintenance', label: 'Maintenance retainer (monthly)', price: 250, category: 'Support' },
  ];

  const categories = [...new Set(quoteCatalog.map((item) => item.category))];

  const toggleItem = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedItems = quoteCatalog.filter((item) => selected[item.id]);
  const subtotal = useMemo(() => selectedItems.reduce((sum, item) => sum + item.price, 0), [selectedItems]);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const summary = await generateAiSummary({
        projectName: projectName || companyName || 'Project',
        selectedItems: selectedItems.map((item) => item.label),
      });
      setAiSummary(summary);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRequest = async () => {
    if (!sanityWriteClient) {
      setRequestError('Backend connection is not configured yet. Please contact ByteAxis.');
      return;
    }
    if (!selectedItems.length) {
      setRequestError('Select at least one service before submitting.');
      return;
    }

    setRequestLoading(true);
    setRequestError('');
    try {
      await sanityWriteClient.create({
        _type: 'quotationRequest',
        projectName: projectName || 'Custom Project',
        companyName,
        timeline,
        notes,
        subtotal,
        vat,
        total,
        status: 'new',
        client: {
          clerkUserId: user?.id || '',
          name: user?.fullName || '',
          email: user?.primaryEmailAddress?.emailAddress || '',
        },
        lineItems: selectedItems.map((item) => ({
          label: item.label,
          category: item.category,
          price: item.price,
        })),
        createdAt: new Date().toISOString(),
      });
      setRequestSuccess(true);
    } catch (err) {
      setRequestError('Failed to submit request. Please try again.');
    } finally {
      setRequestLoading(false);
    }
  };

  const handleProceedToPayment = () => {
    navigate('/payment', {
      state: {
        projectName: projectName || 'Custom Project',
        companyName,
        total,
        subtotal,
        vat,
      },
    });
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="section-kicker">Quotation</p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mt-4">Build your service quotation</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
            Select services, hosting, and business setup options. VAT (15%) is added automatically.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-deep p-8 space-y-6 print-hidden"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Project Name</label>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Retail Management System"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Company Name</label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your business name"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-2">Preferred Timeline</label>
                <input
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="e.g., 6-8 weeks"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Project Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe the idea, target users, or special requirements"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ink">Select Services</h3>
              {categories.map((category) => (
                <div key={category} className="border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">{category}</p>
                  <div className="mt-3 space-y-2">
                    {quoteCatalog.filter((item) => item.category === category).map((item) => (
                      <label key={item.id} className="flex items-start gap-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={!!selected[item.id]}
                          onChange={() => toggleItem(item.id)}
                        />
                        <span className="flex-1">{item.label}</span>
                        <span className="font-semibold text-ink">${item.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={handleGenerateSummary} disabled={loading} className="btn-primary w-full">
              {loading ? 'Generating AI Summary...' : 'Generate AI Summary'}
            </button>
            <p className="text-xs text-slate-500">
              AI summary is powered by the ByteAxis OpenAI workflow (via our Spring backend).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-deep p-8" id="quote-print">
              <div className="flex items-center justify-between">
                <div>
                  <p className="section-kicker">Quotation</p>
                  <h2 className="text-2xl font-bold text-ink mt-2">{projectName || 'Custom Project'}</h2>
                  <p className="text-sm text-slate-500 mt-1">Prepared for {companyName || 'Client'}</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p>{new Date().toLocaleDateString()}</p>
                  <p>VAT: 15%</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {selectedItems.length ? selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="font-semibold text-ink">${item.price}</span>
                  </div>
                )) : (
                  <p className="text-slate-500 text-sm">Select services to build your quotation.</p>
                )}
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-ink">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">VAT (15%)</span>
                  <span className="font-semibold text-ink">${vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-ink">Total</span>
                  <span className="font-bold text-primary-700">${total.toFixed(2)}</span>
                </div>
              </div>

              {timeline && (
                <div className="mt-6 text-sm text-slate-600">
                  <p><span className="font-semibold text-ink">Timeline:</span> {timeline}</p>
                </div>
              )}

              {notes && (
                <div className="mt-4 text-sm text-slate-600">
                  <p className="font-semibold text-ink">Notes</p>
                  <p>{notes}</p>
                </div>
              )}

              <div className="mt-6 p-4 rounded-2xl bg-sand border border-slate-200 text-sm text-slate-600">
                This quotation is an estimate and may change after detailed requirements are confirmed.
              </div>
            </div>

            {aiSummary && (
              <div className="bg-white rounded-3xl shadow-deep p-6">
                <h3 className="text-lg font-semibold text-ink mb-2">AI Summary</h3>
                <p className="text-slate-600 text-sm">{aiSummary}</p>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-deep p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-ink">Request the job to be done</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Submit your quotation so our team can review, confirm scope, and assign a project manager.
                </p>
              </div>

              {requestError && (
                <div className="text-sm text-ember bg-ember/10 border border-ember/20 rounded-2xl px-4 py-3">
                  {requestError}
                </div>
              )}

              {requestSuccess && (
                <div className="text-sm text-moss bg-moss/10 border border-moss/20 rounded-2xl px-4 py-3">
                  Request submitted successfully. We will contact you shortly.
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  className="btn-primary w-full"
                  disabled={requestLoading}
                >
                  {requestLoading ? 'Submitting Request...' : 'Submit Request'}
                </button>
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="btn-outline w-full"
                  disabled={!total}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="btn-outline w-full print-hidden"
            >
              Print Quotation
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quotation;
