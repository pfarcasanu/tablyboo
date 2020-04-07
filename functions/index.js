/* eslint-disable no-bitwise */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const password = require('./password.js');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://tablyboo.firebaseio.com',
});

// dbj.js
const db = admin.database();

// addWord.js
exports.addWord = functions.https.onCall((data, context) => {
  const { word, banned } = data;
  if (password.password !== data.password) {
    return { error: 1 };
  }
  db.ref(`items/${word}`).set({
    word,
    banned: banned.split(',').map((s) => s.trim()),
  });
  return { error: 0 };
});
