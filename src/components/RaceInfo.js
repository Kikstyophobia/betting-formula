import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function RaceInfo() {
  // const [state, setState] = useState({
  //   stage: "",
  //   racers: [],
  //   probability: [],
  //   races: []
  // });

  const stages = [
    {
      id: "686270",
      race: "Australian Grand Prix"
    },
    {
      id: "686488",
      race: "Bahrain Grand Prix"
    },
    {
      id: "686708",
      race: "Chinese Grand Prix"
    },
    {
      id: "686938",
      race: "Portuguese Grand Prix"
    },
    {
      id: "687156",
      race: "Grand Permio de Espana"
    },
    {
      id: "687374",
      race: "Grand Prix de Monaco"
    },
    {
      id: "687592",
      race: "Azerbaijan Grand Prix"
    },
    {
      id: "687822",
      race: "Grand Prix du Canada"
    },
    {
      id: "688040",
      race: "Grand Prix de France"
    },
    {
      id: "688270",
      race: "Grosser Preis von Osterreich" // Austria 
    },
    {
      id: "688718",
      race: "Magyar Nagydij" // Hungary
    },
    {
      id: "688948",
      race: "Belgian Grand Prix"
    },
    {
      id: "689190",
      race: "Dutch Grand Prix"
    },
    {
      id: "689638",
      race: "Russian Grand Prix"
    },
    {
      id: "689868",
      race: "Singapore Grand Prix"
    },
    {
      id: "690098",
      race: "Japanese Grand Prix"
    },
    {
      id: "690316",
      race: "United States Grand Prix"
    },
    {
      id: "690534",
      race: "Gran Premio de Mexico"
    },
    {
      id: "690994",
      race: "Saudi Arabian Grand Prix"
    },
    {
      id: "691212",
      race: "Abu Dhabi Grand Prix"
    },
    {
      id: "694172",
      race: "Imola Grand Prix"
    },
    {
      id: "705016",
      race: "Turkish Grand Prix"
    },
    {
      id: "707680",
      race: "Styrian Grand Prix"
    },
    {
      id: "710452",
      race: "British Grand Prix"
    },
    {
      id: "718612",
      race: "Gran Premio d'Italia"
    },
    {
      id: "725502",
      name: "Qatar Grand Prix"
    },
    {
      id: "730408",
      name: "Grande Premio do Brasil"
    }
  ];

  // const stage = "686488";

  // API call via betting-formula API for a given race
  // useEffect(() => {

  //   Promise.allSettled([
  //     axios.get(`/api/686938`)
  //     // axios.get(`/api/season/937183`)
  //   ])
  //     .then(prev => {
  //       setState(
  //         // { ...prev, stage: all[0].data.stage.parents[0].description, racers: all[0].data.probabilities.markets[1].outcomes, probability: all[0].data.probabilities.markets[1].outcomes, races: all[1].data}
  //         { ...prev, stage: data[0].data.stage.parents[0].description, racers: data[0].data.probabilities.markets[1].outcomes, probability: data[0].data.probabilities.markets[1].outcomes }
  //         // { stage: data[0].data.stage.parents[0].description, racers: data[0].data.probabilities.markets[1].outcomes, probability: data[0].data.probabilities.markets[1].outcomes }
  //       )
  //       console.log("data 0", data);
  //       console.log(data[1]);
  //       // console.log("data 1", data[1]);
  //       // console.log("data", data[1]);
  //       // console.log("data 0", all[0]);
  //       // console.log("data 1", all[1]);
  //     })
  //     // .then(console.log("state", state))
  //     .catch(err => {
  //       console.log(err);
  //     })

  //   const requestOne = axios.get(`/api/686938`);
  //   // const requestTwo = axios.get(`/api/season/937183`);


  //   axios.all([requestOne]).then(axios.spread((...responses) => {
  //     const responseOne = responses[0]
  //     const responseTwo = responses[1]
  //     console.log(responses);
  //     console.log("1", requestOne);
  //     // console.log("2", requestTwo);
  //     // use/access the results 
  //   })).catch(errors => {
  //     // react on errors.
  //     console.log(errors);
  //   })

  // }, [])


  useEffect(() => {
    const endpoints = [`/api/686938`, `/api/season/686252`];
    // console.log("inside useffect");
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then((values) => {
      // Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then((valuesOne, valuesTwo) => {
      setState(prev => (
        { ...prev, stage: values[0].data.stage.parents[0].description, racers: values[0].data.probabilities.markets[1].outcomes, probability: values[0].data.probabilities.markets[1].outcomes }
      ))
      // console.log("inside");
      // console.log("values", values);
      // console.log("values", valuesTwo);

    })
      .catch(err => {
        console.log(err);
      })

  }, [])

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const race = await fetch(`/api/686938`)
  //     // const season = await fetch(`/api/season/686252`)
  //     const json = await [race.json()];

  //     setState(prev => (
  //       // { ...prev, stage: json[0].data.stage.parents[0].description, racers: json[0].data.probabilities.markets[1].outcomes, probability: json[0].data.probabilities.markets[1].outcomes }
  //       {stage: "works man"}
  //     ))

  //     console.log("json", json);
  //     console.log("state", state);
  //     // console.log("data", data1);
  //   }
  //   fetchData()
  //     .catch("ERROR");

  // }, [])



  // maps through win probablities of each racer  
  // and converts win % probability to money line odds
  const oddsList = state.probability.map(data => {
    let odds = data.probability;
    let convertedOdds = "";

    if (odds > 50) {
      convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
    } else if (odds < 50) {
      convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
    } else {
      convertedOdds = 0;
    }

    return (
      convertedOdds
    )
  })

  // maps through racers
  const racerList = state.racers.map(data => {
    return (
      data.name
    )
  })


  return {
    state,
    oddsList,
    racerList
  }
}
