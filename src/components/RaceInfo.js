import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function RaceInfo() {
  const [state, setState] = useState({
    stage: "",
    racers: [],
    probability: []
  });

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
  useEffect(() => {

    axios.get(`/api/686938`)
      .then(data => {
        setState(prev => (
          { ...prev, stage: data.data.stage.parents[0].description, racers: data.data.probabilities.markets[1].outcomes, probability: data.data.probabilities.markets[1].outcomes }
        ))
        console.log("data", data);
        console.log("state", state);
      })
      .catch(err => {
        console.log(err);
      })

  }, [])


  // maps through racers
  // const racerList = state.racers.map(data => {
  //   return (
  //     <div className='grid-item'>{data.name}</div>
  //   )
  // })


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
        <span className='grid-item'>
          <div className='grid-name'>
            {data.name}
          </div>
          <div className='grid-odds'>
            {convertedOdds}
          </div>
        </span>
    )
  })


  // return {
  //   state,
  //   oddsList,
  //   racerList
  // }

  return (
    <>
      <p className='race'>{state.stage}</p>
      <div className='odds-list'>
        <div className='grid-container'>
          {/* {racerList} */}
          {oddsList}
        </div>
      </div>
    </>
  )
}
