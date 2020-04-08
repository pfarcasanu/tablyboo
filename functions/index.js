/* eslint-disable no-bitwise */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const password = require('./password.js');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://tablyboo.firebaseio.com',
});

// util.js
const parseBanned = (banned) => banned.split(',').map((s) => s.trim());

// db.js
const db = admin.database();

// addWord.js
exports.addWord = functions.https.onCall((data) => {
  const { word, banned } = data;
  if (password.password !== data.password) {
    return { error: 1 };
  }
  db.ref(`items/${word}`).set({
    word,
    banned: parseBanned(banned),
  });
  return { error: 0 };
});

// suggestWord.js
exports.suggestWord = functions.https.onCall((data) => {
  const { word, banned } = data;
  db.ref(`suggested/${word}`).set({ word, banned });
  return { error: 0 };
});

// removeSuggested.js
exports.removeSuggested = functions.https.onCall((data) => {
  const { word } = data;
  if (password.password !== data.password) {
    return { error: 1 };
  }
  db.ref(`suggested/${word}`).remove();
  return { error: 0 };
});

// addSuggested.js
exports.addSuggested = functions.https.onCall((data) => {
  const { word, banned } = data;
  if (password.password !== data.password) {
    return { error: 1 };
  }
  db.ref(`suggested/${word}`).remove();
  db.ref(`items/${word}`).set({
    word,
    banned: parseBanned(banned),
  });
  return { error: 0 };
});
