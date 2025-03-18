// // appwriteService.js
// import { Client, Account, Databases, OAuthProvider } from 'appwrite';
// import { APPWRITE_CONFIG } from '../config/appwrite.js';

// // Initialize Appwrite client
// const client = new Client()
//   .setEndpoint(APPWRITE_CONFIG.endpoint)
//   .setProject(APPWRITE_CONFIG.projectId);

// // Initialize Appwrite services
// export const account = new Account(client);
// export const databases = new Databases(client);

// // Authentication methods
// // export const loginWithGoogle = async () => {
// //   try {
// //     const response = await fetch(
// //       `${APPWRITE_CONFIG.endpoint}/v1/account/sessions/oauth2/google`,
// //       {
// //         method: 'GET',
// //         headers: {
// //           'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
// //         },
// //       },
// //     );

// //     const data = await response.json();
// //     const authorizationUrl = data.url;

// //     // Open the URL in a Lynx web view (check Lynx docs for web view API)
// //     // Example pseudo-code:
// //     // const webView = Lynx.openWebView(authorizationUrl);
// //     // webView.on('redirect', (url) => {
// //     //   const sessionToken = extractSessionTokenFromUrl(url);
// //     //   localStorage.setItem('sessionToken', sessionToken);
// //     // });
// //   } catch (error) {
// //     throw new Error('Failed to initiate Google login');
// //   }
// // };

// // export const loginWithGoogle = async () => {
// //   try {
// //     await account.createOAuth2Session(
// //       OAuthProvider.Google,
// //       '/auth/callback',
// //       '/login',
// //     );
// //   } catch (error) {
// //     throw new Error('Failed to initiate Google login');
// //   }
// // };

// export const loginByEmail = async (email: string, password: string) => {
//   try {
//     const response = await fetch(
//       `${APPWRITE_CONFIG.endpoint}/v1/account/sessions/email`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
//         },
//         body: JSON.stringify({ email, password }),
//       },
//     );

//     if (!response.ok) {
//       throw new Error('Login failed');
//     }

//     const session = await response.json();
//     // Store the session token for authenticated requests
//     // localStorage.setItem('sessionToken', session.$id); // Use Lynx’s storage if available
//     return session;
//   } catch (error) {
//     throw error;
//   }
// };

// export const register = async (
//   email: string,
//   password: string,
//   name: string,
// ) => {
//   try {
//     const user = await account.create('unique()', email, password, name);
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

// export const logout = async () => {
//   try {
//     await account.deleteSession('current');
//   } catch (error) {
//     throw error;
//   }
// };

// export const getCurrentUser = async () => {
//   try {
//     const sessionToken = localStorage.getItem('sessionToken');
//     if (!sessionToken) return null;

//     const response = await fetch(`${APPWRITE_CONFIG.endpoint}/v1/account`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
//         'X-Appwrite-Session': sessionToken,
//       },
//     });

//     if (!response.ok) {
//       return null;
//     }

//     const user = await response.json();
//     return user;
//   } catch (error) {
//     return null;
//   }
// };

// // Database methods
// export const createDocument = async (
//   databaseId: string,
//   collectionId: string,
//   data: any,
// ) => {
//   try {
//     const sessionToken = localStorage.getItem('sessionToken');
//     if (!sessionToken) throw new Error('Not authenticated');

//     const response = await fetch(
//       `${APPWRITE_CONFIG.endpoint}/v1/databases/${databaseId}/collections/${collectionId}/documents`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Appwrite-Project': APPWRITE_CONFIG.projectId,
//           'X-Appwrite-Session': sessionToken,
//         },
//         body: JSON.stringify(data),
//       },
//     );

//     if (!response.ok) {
//       throw new Error('Failed to create document');
//     }

//     const document = await response.json();
//     return document;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getDocument = async (
//   databaseId: string,
//   collectionId: string,
//   documentId: string,
// ) => {
//   try {
//     const document = await databases.getDocument(
//       databaseId,
//       collectionId,
//       documentId,
//     );
//     return document;
//   } catch (error) {
//     throw error;
//   }
// };

// export const listDocuments = async (
//   databaseId: string,
//   collectionId: string,
// ) => {
//   try {
//     const documents = await databases.listDocuments(databaseId, collectionId);
//     return documents;
//   } catch (error) {
//     throw error;
//   }
// };
