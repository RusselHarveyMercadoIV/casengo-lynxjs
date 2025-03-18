import { Client, Account, Databases, OAuthProvider } from 'appwrite';
import { APPWRITE_CONFIG } from '../config/appwrite.js';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_CONFIG.endpoint)
  .setProject(APPWRITE_CONFIG.projectId);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// Authentication methods
export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      '/auth/callback',
      '/login',
    );
  } catch (error) {
    throw new Error('Failed to initiate Google login');
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
};

export const register = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    const user = await account.create('unique()', email, password, name);
    return user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
};

// Database methods
export const createDocument = async (
  databaseId: string,
  collectionId: string,
  data: any,
) => {
  try {
    const document = await databases.createDocument(
      databaseId,
      collectionId,
      'unique()',
      data,
    );
    return document;
  } catch (error) {
    throw error;
  }
};

export const getDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string,
) => {
  try {
    const document = await databases.getDocument(
      databaseId,
      collectionId,
      documentId,
    );
    return document;
  } catch (error) {
    throw error;
  }
};

export const listDocuments = async (
  databaseId: string,
  collectionId: string,
) => {
  try {
    const documents = await databases.listDocuments(databaseId, collectionId);
    return documents;
  } catch (error) {
    throw error;
  }
};
