import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    setDoc,
    updateDoc

} from 'firebase/firestore'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';

const firebaseConfig = {
    apiKey: "AIzaSyAcLKceqwZYyHUo1oEF7-W0jAobBbLEcHY",
    authDomain: "betting-formula.firebaseapp.com",
    projectId: "betting-formula",
    storageBucket: "betting-formula.appspot.com",
    messagingSenderId: "713798068583",
    appId: "1:713798068583:web:6265cfd4c19580b687e7c2"
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize services
const db = getFirestore(app);

// collection reference 
const colRef = collection(db, 'races');
const colRefSeasons = collection(db, 'test2022')

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let races = [];
        console.log("docs", snapshot.docs);
        snapshot.docs.forEach((doc) => {
            races.push({ ...doc.data(), id: doc.id })
        })
        console.log("races firestore", races);
    })
    .catch(error => {
        console.log(error.message);
    })

// adds races in a season to collection year
const addSeasonInfo = async () => {
    axios.get(`/api/season/937183`)
        .then(value => {
            value.data.stages.forEach((data) => {
                const description = data.description;
                const raceId = data.stages[4].id
                setDoc(doc(db, "2022", `${raceId}`), {
                    data: data
                })
            })
        })
}

// addSeasonInfo();


// adds probability to Firestore database via raceId
const addProbability = async () => {
    axios.get(`/api/937263`)
        .then(value => {
            console.log(value.data.probabilities.markets[1].outcomes);
            const raceId = value.data.stage.id;
            updateDoc(doc(db, "2022", `${raceId}`), {
                probabilities: value.data.probabilities.markets[1].outcomes
            })
        })
}

addProbability();




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();