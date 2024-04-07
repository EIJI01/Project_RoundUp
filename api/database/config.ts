var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://kkuremindyou-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export default admin;
