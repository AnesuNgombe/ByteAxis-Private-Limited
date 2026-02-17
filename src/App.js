import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Quotation from './pages/Quotation';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Blog from './pages/Blog';
import About from './pages/About';
import Payment from './pages/Payment';

import Footer from './components/layout/Footer';
import './styles/index.css';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/auth" state={{ from: location.pathname }} replace />
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sand">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quotation" element={(
            <RequireAuth>
              <Quotation />
            </RequireAuth>
          )} />
          <Route path="/payment" element={(
            <RequireAuth>
              <Payment />
            </RequireAuth>
          )} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
