import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { sanityClient, sanityConfig } from '../utils/sanityClient';
import { ADMIN_EMAIL } from '../utils/admin';

const AdminDashboard = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const isAdmin = isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) return;
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [requestData, paymentData, newsletterData] = await Promise.all([
          sanityClient.fetch(`*[_type == "quotationRequest"] | order(_createdAt desc)[0...50]{
            _id, projectName, companyName, status, total, client, _createdAt
          }`),
          sanityClient.fetch(`*[_type == "paymentRequest"] | order(_createdAt desc)[0...50]{
            _id, amount, currency, status, email, projectName, _createdAt
          }`),
          sanityClient.fetch(`*[_type == "newsletterSignup"] | order(_createdAt desc)[0...50]{
            _id, email, interests, _createdAt
          }`),
        ]);
        if (isMounted) {
          setRequests(requestData);
          setPayments(paymentData);
          setNewsletters(newsletterData);
        }
      } catch (err) {
        if (isMounted) {
          setRequests([]);
          setPayments([]);
          setNewsletters([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [isAdmin]);

  const stats = useMemo(() => {
    const totalRequests = requests.length;
    const pendingRequests = requests.filter((item) => item.status !== 'completed').length;
    const totalPayments = payments.length;
    const totalRevenue = payments.reduce((sum, item) => sum + (item.amount || 0), 0);
    return [
      { label: 'Requests', value: totalRequests },
      { label: 'Pending', value: pendingRequests },
      { label: 'Payments', value: totalPayments },
      { label: 'Revenue (USD)', value: totalRevenue.toFixed(2) },
    ];
  }, [payments, requests]);

  const monthlyRequests = useMemo(() => {
    const buckets = [];
    const now = new Date();
    for (let i = 5; i >= 0; i -= 1) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.push({
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: date.toLocaleString('default', { month: 'short' }),
        count: 0,
      });
    }
    requests.forEach((item) => {
      const createdAt = new Date(item._createdAt);
      const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;
      const bucket = buckets.find((entry) => entry.key === key);
      if (bucket) bucket.count += 1;
    });
    return buckets;
  }, [requests]);

  const maxCount = Math.max(...monthlyRequests.map((item) => item.count), 1);

  if (!isLoaded) {
    return <div className="min-h-screen py-16 text-center text-slate-500">Loading dashboard...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-ink">Admin access required</h1>
          <p className="text-slate-600 mt-4">
            Please sign in with the authorized admin account to view the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-kicker">Admin Dashboard</p>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mt-3">Operations Control Room</h1>
          <p className="text-slate-600 mt-4 max-w-2xl">
            Monitor quotation requests, payments, and newsletter subscriptions linked to Clerk users.
          </p>
          <p className="text-sm text-slate-500 mt-3">
            Sanity project: {sanityConfig.projectId} • Dataset: {sanityConfig.dataset}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-3xl shadow-deep p-6">
              <p className="text-xs uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className="text-3xl font-semibold text-ink mt-3">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-deep p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink">Requests by month</h3>
              <span className="text-xs text-slate-400">Last 6 months</span>
            </div>
            <div className="h-36 flex items-end gap-3 mt-6">
              {monthlyRequests.map((item) => (
                <div key={item.key} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full rounded-t-lg bg-primary-600/80"
                    style={{ height: `${(item.count / maxCount) * 100}%` }}
                  />
                  <span className="mt-2 text-xs text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-ink text-sand rounded-3xl shadow-deep p-6">
            <h3 className="text-xl font-semibold">Admin Notes</h3>
            <ul className="mt-4 space-y-3 text-sm text-sand/70">
              <li>{requests.length} quotation requests captured.</li>
              <li>{payments.length} payment requests submitted.</li>
              <li>{newsletters.length} newsletter subscribers.</li>
              <li>Status updates can be managed in Sanity Studio.</li>
            </ul>
            <p className="text-xs text-sand/60 mt-6">
              This dashboard uses live data from Sanity and Clerk.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-deep p-6">
            <h3 className="text-xl font-semibold text-ink mb-4">Latest Requests</h3>
            <div className="space-y-4">
              {requests.slice(0, 6).map((item) => (
                <div key={item._id} className="p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink">{item.projectName || 'Custom Project'}</span>
                    <span className="text-slate-500">{new Date(item._createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    {item.client?.name || 'Client'} • {item.client?.email || 'No email'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-600 mt-2">
                    <span>Status: {item.status || 'new'}</span>
                    <span className="font-semibold text-primary-700">${(item.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              ))}
              {!requests.length && (
                <p className="text-sm text-slate-500">No quotation requests yet.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-deep p-6">
            <h3 className="text-xl font-semibold text-ink mb-4">Payment Requests</h3>
            <div className="space-y-4">
              {payments.slice(0, 6).map((item) => (
                <div key={item._id} className="p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink">{item.projectName || 'Project'}</span>
                    <span className="text-slate-500">{new Date(item._createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{item.email}</p>
                  <div className="flex items-center justify-between text-sm text-slate-600 mt-2">
                    <span>Status: {item.status}</span>
                    <span className="font-semibold text-primary-700">${(item.amount || 0).toFixed(2)} {item.currency}</span>
                  </div>
                </div>
              ))}
              {!payments.length && (
                <p className="text-sm text-slate-500">No payment requests yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-deep p-6">
          <h3 className="text-xl font-semibold text-ink mb-4">Newsletter Subscribers</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {newsletters.slice(0, 8).map((item) => (
              <div key={item._id} className="p-4 rounded-2xl border border-slate-200">
                <p className="text-sm font-semibold text-ink">{item.email}</p>
                <p className="text-xs text-slate-500 mt-1">{item.interests || 'General updates'}</p>
              </div>
            ))}
            {!newsletters.length && (
              <p className="text-sm text-slate-500">No newsletter signups yet.</p>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-center text-sm text-slate-500">Refreshing data...</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
