# Casengo Server

A Node.js server that handles Appwrite authentication and database operations.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

   - Copy `.env.example` to `.env`
   - Fill in your Appwrite credentials:
     - `APPWRITE_ENDPOINT`: Your Appwrite endpoint URL
     - `APPWRITE_PROJECT_ID`: Your Appwrite project ID
     - `APPWRITE_API_KEY`: Your Appwrite API key
     - `PORT`: Server port (default: 3000)

3. Start the server:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- **POST /auth/login**

  - Body: `{ "email": "user@example.com", "password": "password" }`
  - Returns: Session object

- **POST /auth/register**

  - Body: `{ "email": "user@example.com", "password": "password", "name": "User Name" }`
  - Returns: User object

- **POST /auth/logout**
  - Body: `{ "sessionId": "current" }`
  - Returns: Success message

### Database Operations

- **POST /database/:databaseId/:collectionId**

  - Creates a new document
  - Body: Document data
  - Returns: Created document

- **GET /database/:databaseId/:collectionId/:documentId**

  - Retrieves a specific document
  - Returns: Document data

- **GET /database/:databaseId/:collectionId**
  - Lists all documents in a collection
  - Returns: Array of documents

## Error Handling

All endpoints return appropriate error messages with corresponding HTTP status codes in case of failures.
