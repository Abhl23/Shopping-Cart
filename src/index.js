import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import firebase from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBReqwL03qCNuwoaE3MQYbHyfVeeil1rJo",
  authDomain: "cart-3c562.firebaseapp.com",
  projectId: "cart-3c562",
  storageBucket: "cart-3c562.appspot.com",
  messagingSenderId: "505224360143",
  appId: "1:505224360143:web:7a6782691c633b6604c7ba"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);