const admin = require("firebase-admin");
const fetch = require("node-fetch"); // Assuming you're using Node.js

// Initialize Firebase Admin SDK
const serviceAccount = require("C:\\Users\\camdi\\OneDrive\\Desktop\\March ap\\march-e499a-firebase-adminsdk-dusr9-397a56b1ba.json"); // Replace with the path to your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "DATABASE URL"// Replace with your Firebase project's database URL
});

// Function to fetch data from your API and write it to Firebase Realtime Database
async function fetchDataAndWriteToFirebase() {
  try {
    const response = await fetch("http://localhost:3001/api/data"); // Replace with your API endpoint
    const data = await response.json();
    //const players = data['C:User']['camdi']['onedrive']['desktop']['College Basketball Stats']['public']['data'];

    // Write the data to Firebase Realtime Database
    const db = admin.database();
    const ref = db.ref("standings"); // Replace with the path where you want to store the data in Firebase
    await ref.set(data);

    console.log("Data synced to Firebase successfully.");
  } catch (error) {
    console.error("Error syncing data to Firebase:", error);
  }
}

// Call the function to fetch data from your API and write it to Firebase
fetchDataAndWriteToFirebase();
