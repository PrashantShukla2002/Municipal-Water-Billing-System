import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import BillPage from './pages/BillPage';
import DashboardPage from './pages/DashboardPage';
import ThankYou from './pages/ThankYou';

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <header className="topbar">
          <div className="container">
            <Link to="/" className="brand">Municipal WaterPay</Link>
            <nav>
              <Link to="/">Operator</Link>
              <Link to="/dashboard">Dashboard</Link>
            </nav>
          </div>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bill/:billNumber" element={<BillPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
