/* eslint-disable import/no-duplicates */
import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {};

firebase.default.initializeApp(firebaseConfig);

export const auth = firebase.default.auth();
export const database = firebase.default.database();
