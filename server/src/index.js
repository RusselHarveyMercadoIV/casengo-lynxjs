import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Client, Account, Databases, ID } from "node-appwrite";
import cookieParser from "cookie-parser";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Initialize Appwrite
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const account = new Account(client);
const databases = new Databases(client);

// Auth Routes
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const session = await account.createEmailSession(email, password);
    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Initiate Google OAuth flow
app.get("/auth/google", async (req, res) => {
  try {
    // Generate a secure state parameter to verify the callback
    const state = ID.unique();

    // Store state in a cookie for verification
    res.cookie("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Build Google OAuth URL with mobile-friendly redirect
    const redirectUrl = `${process.env.SERVER_URL}/auth/callback`;
    const googleAuthUrl = `${process.env.APPWRITE_ENDPOINT}/account/sessions/oauth2/google?project=${process.env.APPWRITE_PROJECT_ID}&success=${redirectUrl}&failure=${redirectUrl}&state=${state}`;

    // For mobile apps, return the URL instead of redirecting
    if (req.headers["x-mobile-request"]) {
      return res.json({ authUrl: googleAuthUrl });
    }

    // For web browsers, redirect directly
    res.redirect(googleAuthUrl);
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(400).json({
      error: error.message || "Failed to initiate Google authentication",
      details: error.response?.data || error,
    });
  }
});

// OAuth callback handler
app.get("/auth/callback", async (req, res) => {
  try {
    // Verify the state parameter
    const { state } = req.query;
    const storedState = req.cookies?.oauth_state;

    if (!state || !storedState || state !== storedState) {
      console.error("Invalid state parameter:", { state, storedState });
      throw new Error("Invalid state parameter");
    }

    // Clear the state cookie
    res.clearCookie("oauth_state");

    // Get current session
    const session = await account.getSession("current");
    if (!session) {
      throw new Error("No active session found");
    }

    // Create a JWT for the mobile app
    const jwt = await account.createJWT();
    if (!jwt?.jwt) {
      throw new Error("Failed to create JWT token");
    }

    // Check if this is a mobile request
    if (req.headers["x-mobile-request"]) {
      return res.json({
        success: true,
        token: jwt.jwt,
        session: session,
      });
    }

    // For web browsers, redirect to the mobile app using the custom URL scheme
    res.redirect(`lynxapp://auth?token=${jwt.jwt}`);
  } catch (error) {
    console.error("Auth callback error:", error);
    // Handle errors appropriately for both mobile and web
    if (req.headers["x-mobile-request"]) {
      return res.status(400).json({
        success: false,
        error: error.message || "Authentication failed",
        details: error.response?.data || error,
      });
    }
    res.redirect(
      `lynxapp://auth?error=${encodeURIComponent(
        error.message || "Authentication failed"
      )}`
    );
  }
});

app.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await account.create(ID.unique(), email, password, name);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/auth/logout", async (req, res) => {
  try {
    const { sessionId } = req.body;
    await account.deleteSession(sessionId);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Database Routes
app.post("/database/:databaseId/:collectionId", async (req, res) => {
  try {
    const { databaseId, collectionId } = req.params;
    const document = await databases.createDocument(
      databaseId,
      collectionId,
      "unique()",
      req.body
    );
    res.json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/database/:databaseId/:collectionId/:documentId", async (req, res) => {
  try {
    const { databaseId, collectionId, documentId } = req.params;
    const document = await databases.getDocument(
      databaseId,
      collectionId,
      documentId
    );
    res.json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/database/:databaseId/:collectionId", async (req, res) => {
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
