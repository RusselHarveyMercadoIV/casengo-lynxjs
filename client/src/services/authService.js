import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

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
      const response = await axios.post(`${API_URL}/auth/loginByGoogle`);
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
};

export default authService;
