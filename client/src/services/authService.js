import axios from 'axios';

const API_URL = 'http://localhost:3000';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  loginWithGoogle: async () => {
    try {
      // For mobile, we'll use the server's Google auth endpoint
      // The server will handle the OAuth flow and redirect back to our app
      const response = await axios.get(`${API_URL}/auth/google`, {
        headers: {
          'x-mobile-request': 'true',
        },
      });
      // The server will redirect to our app's custom URL scheme
      // The actual redirect will be handled by the mobile app's deep linking
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  register: async (email, password, name) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async (sessionId) => {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`, {
        sessionId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Handle the auth callback
  handleAuthCallback: (url) => {
    if (url.startsWith('lynxapp://auth')) {
      try {
        // Parse the URL to get token or error
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (token) {
          // Save the token to use for authenticated requests
          localStorage.setItem('auth_token', token);
          console.log('Successfully logged in!');
          return { success: true, token };
        } else if (error) {
          console.error('Login error:', error);
          return { success: false, error };
        }
      } catch (e) {
        console.error('Failed to process auth callback:', e);
        return { success: false, error: e.message };
      }
    }
    return { success: false, error: 'Invalid URL' };
  },
};

export default authService;
