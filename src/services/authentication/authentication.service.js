import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { actions } from '../../context/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC8EpeJjgxD5mwQExeJWbzRvcs39v50nW4',
  authDomain: 'mealstogo-352207.firebaseapp.com',
  databaseURL: 'https://mealstogo-352207-default-rtdb.firebaseio.com',
  projectId: 'mealstogo-352207',
  storageBucket: 'mealstogo-352207.appspot.com',
  messagingSenderId: '328762063020',
  appId: '1:328762063020:web:587013a9ec2f2c1b4fc709',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const loginRequest = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const registerRequest = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const logoutRequest = () => {
  return auth().signOut();
};

export const onAuthStateChanged = dispatch => {
  auth().onAuthStateChanged(result => {
    let payload = result;
    if (result && 'user' in result) payload = result.user;

    dispatch({ type: actions.ON_AUTH, payload });
  });
};
