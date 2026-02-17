import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignIn, useSignUp } from '@clerk/clerk-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.8 6 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.5 0 19-8.5 19-19 0-1.1-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.8 6 29.1 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z" />
    <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.3l-6.1-5.1c-1.8 1.4-4.1 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.7 39.6 16.4 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.6-2.9 4.9-5.4 6.5l6.1 5.1c-1.1 1-7 4.4-12 4.4-7.6 0-14.3-4.4-17.5-10.7l6.5-5c1.6 4.6 6 7.9 11.2 7.9 3 0 5.4-1 7.2-2.4l6.1 5.1c2.6-2.4 4.6-5.6 5.4-9.4.3-1.2.4-2.4.4-3.5z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#111827" d="M16.7 2.3c-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 0 2-.6 2.7-1.4.6-.7 1-1.8.8-2.8zM12.7 6.2c-1.2 0-2.5.7-3.3.7-.8 0-1.9-.7-3.2-.7-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.4 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.2-.1 1.7-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.4 0 2.2-1.2 3-2.5 1-1.5 1.4-3 1.4-3.1-.1 0-2.7-1-2.7-4 0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.8-1.9z" />
  </svg>
);

const Auth = () => {
  const [mode, setMode] = useState('sign-in');
  const [form, setForm] = useState({
    name: '',
    email: '',
    identifier: '',
    username: '',
    password: '',
    confirm: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [pendingSignInVerification, setPendingSignInVerification] = useState(false);
  const [signInCode, setSignInCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [oauthLoading, setOauthLoading] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, setActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  const destination = location.state?.from || '/quotation';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setError('');
    setPendingVerification(false);
    setVerificationCode('');
    setPendingSignInVerification(false);
    setSignInCode('');
  };

  const handleOAuth = async (strategy) => {
    const isSignUp = mode === 'sign-up';
    const authClient = isSignUp ? signUp : signIn;
    const isLoaded = isSignUp ? signUpLoaded : signInLoaded;
    if (!isLoaded || oauthLoading) return;
    setError('');
    setOauthLoading(strategy);
    try {
      await authClient.authenticateWithRedirect({
        strategy,
        redirectUrl: '/auth',
        redirectUrlComplete: destination,
      });
    } catch (err) {
      const message = err?.errors?.[0]?.message || 'OAuth sign-in failed. Please try again.';
      setError(message);
      setOauthLoading('');
    }
  };

  const handleAuth = async () => {
    if (loading) return;
    setError('');

    if (mode === 'sign-in' && !signInLoaded) return;
    if (mode === 'sign-up' && !signUpLoaded) return;

    setLoading(true);
    try {
      if (mode === 'sign-in') {
        const result = await signIn.create({
          identifier: form.identifier.trim(),
          password: form.password,
        });

        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId });
          navigate(destination, { replace: true });
          return;
        }

        if (result.status === 'needs_first_factor') {
          const emailFactor = result.supportedFirstFactors?.find((factor) => factor.strategy === 'email_code');
          if (emailFactor) {
            await signIn.prepareFirstFactor({ strategy: 'email_code' });
            setPendingSignInVerification(true);
            return;
          }
        }

        if (result.status === 'needs_second_factor') {
          setError('Two-factor authentication is required. Please complete it in your Clerk account.');
          return;
        }
        return;
      }

      if (form.password !== form.confirm) {
        setError('Passwords do not match.');
        return;
      }

      const trimmedName = form.name.trim();
      const [firstName, ...rest] = trimmedName.split(' ');
      const lastName = rest.join(' ') || undefined;

      const result = await signUp.create({
        emailAddress: form.email,
        password: form.password,
        username: form.username || undefined,
        firstName: firstName || undefined,
        lastName,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate(destination, { replace: true });
        return;
      }

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      const message = err?.errors?.[0]?.message || 'Authentication failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!signUpLoaded || loading) return;
    setError('');
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: verificationCode });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate(destination, { replace: true });
      } else {
        setError('Verification pending. Please try again.');
      }
    } catch (err) {
      const message = err?.errors?.[0]?.message || 'Verification failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInVerification = async () => {
    if (!signInLoaded || loading) return;
    setError('');
    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({ strategy: 'email_code', code: signInCode });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate(destination, { replace: true });
      } else {
        setError('Verification pending. Please try again.');
      }
    } catch (err) {
      const message = err?.errors?.[0]?.message || 'Verification failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-sheen grid-noise py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start items-center gap-4 mb-6">
              <img src="/img/byteaxis_logo.png" alt="ByteAxis logo" className="h-16 w-auto bounce-logo" />
              <div>
                <p className="section-kicker">Client Portal</p>
                <h1 className="text-4xl font-bold text-ink">Access your services</h1>
              </div>
            </div>
            <p className="text-lg text-slate-600 max-w-xl">
              Manage your projects, track progress, and get smart recommendations powered by our AI workflow.
            </p>
            <div className="mt-8 grid gap-4">
              <div className="p-5 bg-white rounded-2xl shadow-deep">
                <p className="text-sm uppercase tracking-widest text-slate-400">What you get</p>
                <ul className="mt-3 space-y-2 text-slate-700">
                  <li>Transparent milestone tracking</li>
                  <li>Instant quotation downloads</li>
                  <li>AI-generated project summaries</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-deep p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-kicker">Sign In</p>
                <h2 className="text-2xl font-bold text-ink">
                  {mode === 'sign-in' ? 'Welcome back' : 'Create an account'}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuth('oauth_google')}
                  disabled={!!oauthLoading}
                  className="p-2 rounded-full border border-slate-200 hover:border-primary-600 transition disabled:opacity-60"
                  aria-label="Sign in with Google"
                >
                  <GoogleIcon />
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuth('oauth_apple')}
                  disabled={!!oauthLoading}
                  className="p-2 rounded-full border border-slate-200 hover:border-primary-600 transition disabled:opacity-60"
                  aria-label="Sign in with Apple"
                >
                  <AppleIcon />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => handleModeChange('sign-in')}
                className={`flex-1 py-2 rounded-full font-semibold ${
                  mode === 'sign-in' ? 'bg-primary-600 text-white' : 'bg-sand text-slate-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleModeChange('sign-up')}
                className={`flex-1 py-2 rounded-full font-semibold ${
                  mode === 'sign-up' ? 'bg-primary-600 text-white' : 'bg-sand text-slate-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="grid gap-4">
                {mode === 'sign-up' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    {mode === 'sign-in' ? 'Email or Username' : 'Email'}
                  </label>
                  <input
                    name={mode === 'sign-in' ? 'identifier' : 'email'}
                    type={mode === 'sign-in' ? 'text' : 'email'}
                    value={mode === 'sign-in' ? form.identifier : form.email}
                    onChange={handleChange}
                    placeholder={mode === 'sign-in' ? 'you@company.com or username' : 'you@company.com'}
                    className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {mode === 'sign-up' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Username (optional)</label>
                    <input
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="byteaxis-user"
                      className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {mode === 'sign-up' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Confirm Password</label>
                    <input
                      name="confirm"
                      type="password"
                      value={form.confirm}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                {mode === 'sign-in' && (
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-slate-300" />
                      Remember me
                    </label>
                    <button type="button" className="text-primary-600 hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                {pendingVerification && (
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Email Verification Code</label>
                    <input
                      name="verification"
                      value={verificationCode}
                      onChange={(event) => setVerificationCode(event.target.value)}
                      placeholder="Enter the code sent to your email"
                      className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                {pendingSignInVerification && (
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Sign-in Verification Code</label>
                    <input
                      name="signInCode"
                      value={signInCode}
                      onChange={(event) => setSignInCode(event.target.value)}
                      placeholder="Enter the code sent to your email"
                      className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                {error && (
                  <div className="text-sm text-ember bg-ember/10 border border-ember/20 rounded-2xl px-4 py-3">
                    {error}
                  </div>
                )}

                {oauthLoading && (
                  <div className="text-xs text-slate-500 text-center">
                    Redirecting to {oauthLoading === 'oauth_google' ? 'Google' : 'Apple'}...
                  </div>
                )}

                {!pendingVerification && !pendingSignInVerification && (
                  <button type="button" className="btn-primary w-full" onClick={handleAuth} disabled={loading}>
                    {loading ? 'Please wait...' : mode === 'sign-in' ? 'Sign In' : 'Create Account'}
                  </button>
                )}

                {pendingVerification && (
                  <button type="button" className="btn-primary w-full" onClick={handleVerification} disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify Email'}
                  </button>
                )}

                {pendingSignInVerification && (
                  <button type="button" className="btn-primary w-full" onClick={handleSignInVerification} disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify Sign In'}
                  </button>
                )}

                <p className="text-xs text-slate-500 text-center">
                  Authentication is powered by Clerk. If you need help, contact the ByteAxis team.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
