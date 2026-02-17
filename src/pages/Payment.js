import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { sanityWriteClient } from '../utils/sanityClient';

const Payment = () => {
  const location = useLocation();
  const { user } = useUser();
  const quoteState = location.state || {};

  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    phone: '',
    amount: quoteState.total || '',
    projectName: quoteState.projectName || '',
    companyName: quoteState.companyName || '',
    reference: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const formattedAmount = useMemo(() => {
    const amount = parseFloat(form.amount);
    if (Number.isNaN(amount)) return '';
    return amount.toFixed(2);
  }, [form.amount]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!sanityWriteClient) {
      setStatus({ loading: false, error: 'Payments are not configured yet. Please contact ByteAxis.', success: '' });
      return;
    }
    if (!form.amount || !form.email) {
      setStatus({ loading: false, error: 'Amount and email are required.', success: '' });
      return;
    }
    setStatus({ loading: true, error: '', success: '' });
    try {
      await sanityWriteClient.create({
        _type: 'paymentRequest',
        projectName: form.projectName || 'Custom Project',
        companyName: form.companyName,
        amount: parseFloat(form.amount),
        currency: 'USD',
        method: 'Paynow',
        email: form.email,
        phone: form.phone,
        reference: form.reference,
        status: 'pending',
        client: {
          clerkUserId: user?.id || '',
          name: user?.fullName || form.fullName,
          email: user?.primaryEmailAddress?.emailAddress || form.email,
        },
        createdAt: new Date().toISOString(),
      });
      setStatus({ loading: false, error: '', success: 'Payment request submitted. Our team will confirm the Paynow link.' });
    } catch (err) {
      setStatus({ loading: false, error: 'Unable to submit payment request. Please try again.', success: '' });
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="section-kicker">Payments</p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mt-4">Pay securely via Paynow (USD)</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
            Submit your payment request and we will send the Paynow payment link with confirmation and receipts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-deep p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">WhatsApp / Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+263 77 866 3941"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Amount (USD)</label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Project Name</label>
                <input
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  placeholder="Project"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Company Name</label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Company"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Reference (optional)</label>
              <input
                name="reference"
                value={form.reference}
                onChange={handleChange}
                placeholder="Invoice or quote reference"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {status.error && (
              <div className="text-sm text-ember bg-ember/10 border border-ember/20 rounded-2xl px-4 py-3">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="text-sm text-moss bg-moss/10 border border-moss/20 rounded-2xl px-4 py-3">
                {status.success}
              </div>
            )}

            <button type="submit" className="btn-primary w-full" disabled={status.loading}>
              {status.loading ? 'Submitting...' : 'Request Paynow Link'}
            </button>
            <p className="text-xs text-slate-500 text-center">
              Payments are processed in USD. A Paynow payment link will be sent to your email.
            </p>
          </form>

          <div className="space-y-6">
            <div className="bg-ink text-sand rounded-3xl p-8 shadow-deep">
              <p className="section-kicker text-sand/60">Summary</p>
              <h2 className="text-2xl font-semibold mt-3">Payment Overview</h2>
              <div className="mt-6 space-y-2 text-sm text-sand/80">
                <div className="flex items-center justify-between">
                  <span>Project</span>
                  <span className="font-semibold text-sand">{form.projectName || 'Custom Project'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Company</span>
                  <span className="font-semibold text-sand">{form.companyName || 'Client'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Amount (USD)</span>
                  <span className="font-semibold text-secondary-500">${formattedAmount || '0.00'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Method</span>
                  <span className="font-semibold text-sand">Paynow</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-deep p-8">
              <h3 className="text-xl font-semibold text-ink">What happens next</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>We verify the request and send you a Paynow payment link.</li>
                <li>Once payment is confirmed, the ByteAxis team starts onboarding.</li>
                <li>You receive invoices, receipts, and project kickoff timeline.</li>
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to="/quotation" className="btn-outline">Back to Quotation</Link>
                <Link to="/contact" className="btn-primary">Need help?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
