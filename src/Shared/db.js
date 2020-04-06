import firebase from 'firebase/app';
import 'firebase/database';
import config from './config';

firebase.initializeApp(config);
const db = firebase.database().ref();

export default db;
