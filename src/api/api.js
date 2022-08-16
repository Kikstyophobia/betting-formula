import React from "react";
import axios from "axios";

export default function ApiInfo() {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://v1.formula-1.api-sports.io/seasons',
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      'x-rapidapi-host': 'v1.formula-1.api-sports.io'
    }
  };

  axios(config)
    .then(function (response) {
      console.log((response.data));
    })
    .catch(function (error) {
      console.log(error);
    });


}