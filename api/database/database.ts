const firebase = require("firebase-admin");
const serviceAccount = require("path");


const database = firebase.firestore();

export default database;
