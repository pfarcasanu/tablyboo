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
exports.addWord = functions.https.onRequest((request, response) => {
  const { word, banned, id } = request.body;
  if (password.password !== request.body.password) {
    response.send('failed');
    return;
  }
  db.ref(`items/${id}`).set({
    id,
    word,
    banned: banned.split(',').map((s) => s.trim()),
  });
  response.send('success');
});
