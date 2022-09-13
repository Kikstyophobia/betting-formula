// import express from 'express';
// const app = express();
// const cors = require('cors');
import axios from 'axios';


export default function apiRequest() {
  // const api_key = process.env.REACT_APP_API_KEY;
  // app.use(cors());
  
  axios.get(`http://api.sportradar.us/formula1/trial/v2/en/sport_events/sr:stage:686252/probabilities.json?api_key=http://api.sportradar.us/formula1/trial/v2/en/sport_events/sr:stage:686252/probabilities.json?api_key=wu5ewmapjwdztmfneac4c7n5`)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    })

  // axios.get(`https://official-joke-api.appspot.com/random_joke`)
  //   .then(data => {
  //     console.log(data.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

}
