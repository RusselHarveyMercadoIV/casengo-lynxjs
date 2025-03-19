import axios from 'axios';

const API_URL = 'http://localhost:3000';

const databaseService = {
  createDocument: async (databaseId, collectionId, data) => {
    try {
      const response = await axios.post(
        `${API_URL}/database/${databaseId}/${collectionId}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocument: async (databaseId, collectionId, documentId) => {
    try {
      const response = await axios.get(
        `${API_URL}/database/${databaseId}/${collectionId}/${documentId}`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  listDocuments: async (databaseId, collectionId) => {
    try {
      const response = await axios.get(
        `${API_URL}/database/${databaseId}/${collectionId}`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default databaseService;
