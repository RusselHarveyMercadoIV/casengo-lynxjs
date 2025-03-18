import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client, Account, Databases } from 'node-appwrite';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Appwrite
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const account = new Account(client);
const databases = new Databases(client);

// Auth Routes
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const session = await account.createEmailSession(email, password);
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/auth/loginByGoogle', async (res) => {
  try {
    const session = await account.createOAuth2Session(
      OAuthProvider.Google,
      '/auth/callback',
      '/login',
    );
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await account.create('unique()', email, password, name);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/auth/logout', async (req, res) => {
  try {
    const { sessionId } = req.body;
    await account.deleteSession(sessionId);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Database Routes
app.post('/database/:databaseId/:collectionId', async (req, res) => {
  try {
    const { databaseId, collectionId } = req.params;
    const document = await databases.createDocument(
      databaseId,
      collectionId,
      'unique()',
      req.body,
    );
    res.json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/database/:databaseId/:collectionId/:documentId', async (req, res) => {
  try {
    const { databaseId, collectionId, documentId } = req.params;
    const document = await databases.getDocument(
      databaseId,
      collectionId,
      documentId,
    );
    res.json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/database/:databaseId/:collectionId', async (req, res) => {
  try {
    const { databaseId, collectionId } = req.params;
    const documents = await databases.listDocuments(databaseId, collectionId);
    res.json(documents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
