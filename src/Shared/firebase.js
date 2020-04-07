import firebase from 'firebase/app';
import 'firebase/database';
import config from './config';

require('firebase/functions');

firebase.initializeApp(config);

const functions = firebase.functions();
const db = firebase.database().ref();

export { db, functions };
