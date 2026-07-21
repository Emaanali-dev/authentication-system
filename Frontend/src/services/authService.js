const API_URL = 'https://localhost:7267/api/Auth';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.Message || 'Login failed. Please check your credentials.');
      }

      const data = await response.json();
      if (data.Token) {
        localStorage.setItem('token', data.Token);
        localStorage.setItem('userEmail', data.Email);
        localStorage.removeItem('isDemoMode');
      }
      return data;
    } catch (err) {
      // If server is offline or fails to connect, fallback to client-side demo mode
      if (err.name === 'TypeError' || err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        console.warn('Backend API is offline. Switching to Demo Mode.');
        
        // If they registered in demo mode, verify password. Otherwise allow default passwords
        const savedPass = localStorage.getItem(`demo_user_${email.toLowerCase()}`);
        if (savedPass && savedPass !== password) {
          throw new Error('Invalid credentials (Demo mode: password does not match registered password).');
        }

        const mockToken = 'demo_jwt_token_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isDemoMode', 'true');
        return { Token: mockToken, Email: email };
      }
      throw err;
    }
  },

  register: async (email, password, confirmPassword) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => []);
        let errorMessage = 'Registration failed.';
        if (Array.isArray(errorData)) {
          errorMessage = errorData.map(err => err.description).join(' ') || errorMessage;
        } else if (errorData.Message) {
          errorMessage = errorData.Message;
        } else if (typeof errorData === 'object') {
          errorMessage = Object.values(errorData).flat().join(' ') || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (err) {
      // Offline Demo Fallback
      if (err.name === 'TypeError' || err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        console.warn('Backend API is offline. Simulating registration in local storage.');
        
        localStorage.setItem(`demo_user_${email.toLowerCase()}`, password);
        return { Message: 'Registration successful! (Demo Mode Enabled)' };
      }
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isDemoMode');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const isDemoMode = localStorage.getItem('isDemoMode') === 'true';
    if (!token) return null;
    return { token, email, isDemoMode };
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
