import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function Dashboard() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Secure Portal</h1>
          <p className="auth-subtitle" style={{ textAlign: 'left', marginBottom: 0 }}>
            Authorized Session Active
          </p>
        </div>
        <button className="btn-secondary" onClick={handleLogout}>
          Sign Out
        </button>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-card" style={{ gridColumn: 'span 2' }}>
          <h2 className="card-title">Welcome back, {currentUser?.email || 'User'}!</h2>
          <p className="card-desc">
            You have successfully authenticated using JWT tokens with ASP.NET Core Identity. 
            This session is secure and all subsequent API requests include your bearer credentials.
          </p>
          <div style={{ marginTop: '16px' }}>
            <span className="user-badge">{currentUser?.isDemoMode ? 'Demo Session' : 'JWT Verified'}</span>
            <span className="user-badge" style={{ 
              marginLeft: '10px', 
              background: currentUser?.isDemoMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(74, 222, 128, 0.1)', 
              borderColor: currentUser?.isDemoMode ? 'rgba(245, 158, 11, 0.3)' : 'rgba(74, 222, 128, 0.3)', 
              color: currentUser?.isDemoMode ? '#f59e0b' : '#4ade80' 
            }}>
              {currentUser?.isDemoMode ? 'Offline Demo Mode' : 'Connected to API'}
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">Security Parameters</h3>
          <p className="card-desc" style={{ fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            Token: {currentUser?.token ? `${currentUser.token.substring(0, 30)}...` : 'No Token'}
            {"\n\n"}
            Issuer: AuthenticationAPI
            {"\n"}
            Algorithm: HS256
          </p>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">System Status</h3>
          <p className="card-desc">
            All services are operational. Your local environment connection is secure.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
            <span style={{ fontSize: '0.85rem', color: '#4ade80' }}>Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
