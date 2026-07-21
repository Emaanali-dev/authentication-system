import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroWalletImg from '../assets/hero_wallet.jpg';

function LandingPage() {
  const navigate = useNavigate();
  const [sendAmount, setSendAmount] = useState('150');
  const [recipient, setRecipient] = useState('Sarah Jenkins');
  const [demoStatus, setDemoStatus] = useState('idle'); // idle, sending, success

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (demoStatus !== 'idle') return;
    setDemoStatus('sending');
    setTimeout(() => {
      setDemoStatus('success');
      setTimeout(() => {
        setDemoStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="landing-container">
      {/* Background Decorative Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge-promo">⚡ Version 2.0 Now Live</div>
          <h1 className="hero-title">
            The next generation <br />
            <span>digital wallet</span>
          </h1>
          <p className="hero-description">
            Send, spend, save, and track your money globally with e-wallets. Enjoy instant transfers, absolute security, and zero hidden fees.
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary btn-large" onClick={() => navigate('/register')}>
              Get Started Free
            </button>
            <button className="btn-secondary btn-large" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">2.4M+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">$12B+</span>
              <span className="stat-label">Processed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Graphics */}
        <div className="hero-graphics">
          {/* Animated App Mockup Image */}
          <div className="hero-image-card">
            <img src={heroWalletImg} alt="e-wallets premium visual" className="hero-wallet-img" />
            <div className="image-glow-overlay"></div>
          </div>

          {/* Glassmorphic Credit Card */}
          <div className="glass-card-preview">
            <div className="card-chip"></div>
            <div className="card-brand">e-wallets</div>
            <div className="card-number">•••• •••• •••• 8842</div>
            <div className="card-details">
              <div>
                <div className="card-label">CARD HOLDER</div>
                <div className="card-val">ALEX MERLYN</div>
              </div>
              <div>
                <div className="card-label">EXPIRES</div>
                <div className="card-val">08/30</div>
              </div>
            </div>
            <div className="card-glow-element"></div>
          </div>

          {/* Mini Interactive Sending Demo */}
          <div className="demo-widget-card">
            <h4>Quick Transfer Demo</h4>
            <form onSubmit={handleDemoSubmit}>
              <div className="demo-input-group">
                <label>Send To</label>
                <select 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)}
                  disabled={demoStatus !== 'idle'}
                >
                  <option value="Sarah Jenkins">Sarah Jenkins (s.jenkins@mail.com)</option>
                  <option value="Marcus Aurelius">Marcus Aurelius (marcus@rome.org)</option>
                  <option value="David Miller">David Miller (d.miller@tech.net)</option>
                </select>
              </div>
              <div className="demo-input-group">
                <label>Amount (USD)</label>
                <div className="amount-input-wrapper">
                  <span>$</span>
                  <input 
                    type="number" 
                    value={sendAmount} 
                    onChange={(e) => setSendAmount(e.target.value)} 
                    disabled={demoStatus !== 'idle'}
                    min="1"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className={`btn-demo-send ${demoStatus}`}
                disabled={demoStatus !== 'idle'}
              >
                {demoStatus === 'idle' && 'Send Money Instantly'}
                {demoStatus === 'sending' && 'Processing Transfer...'}
                {demoStatus === 'success' && '✓ Transfer Complete!'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why millions choose <span>e-wallets</span></h2>
        <p className="section-subtitle">Everything you need from a modern bank, right in your pocket.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💸</div>
            <h3>Instant Transfers</h3>
            <p>Send money locally or internationally in seconds. No processing delays or high fees.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Military-Grade Security</h3>
            <p>Your wallet is protected by JWT security, end-to-end encryption, and 2FA features.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Budgeting</h3>
            <p>Track your spending with AI-powered analytics and monthly breakdown charts.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Virtual Cards</h3>
            <p>Generate secure virtual cards for safer online shopping instantly.</p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="cta-bottom">
        <div className="cta-content">
          <h2>Ready to secure your future finance?</h2>
          <p>Join over 2 million users managing their daily spending with e-wallets.</p>
          <button className="btn-primary btn-large" onClick={() => navigate('/register')}>
            Create Your Free Account
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
