// import express from 'express';
// const app = express();
// const cors = require('cors');
import axios from 'axios';


export default function apiRequest() {
  const api_key = process.env.REACT_APP_API_KEY;
  // app.use(cors());
  
  // axios.get(`http://api.sportradar.us/formula1/trial/v2/en/sport_events/sr:stage:686252/probabilities.json?api_key=http://api.sportradar.us/formula1/trial/v2/en/sport_events/sr:stage:686252/probabilities.json?api_key=${api_key}`)
  axios.get(`http://localhost:3001/info`)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    })
    
}
