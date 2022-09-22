import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function RaceInfo() {
  const [state, setState] = useState({
    stage: "",
    racers: [],
    probability: []
  })

  // const stage = "686488";

  // API call via betting-formula API for a given race
  useEffect(() => {
    // const { stage } = "686488";

    axios.get(`/api/687374`)
      .then(data => {
        setState(prev => (
          { ...prev, stage: data.data.stage.parents[0].description, racers: data.data.probabilities.markets[1].outcomes, probability: data.data.probabilities.markets[1].outcomes}
        ))
        console.log("data", data);
      })
      .catch(err => {
        console.log(err);
      })

  }, [])


  // maps through racers
  const racerList = state.racers.map(data => {
    return (
      <p>{data.name}</p>
    )
  })
  

  // maps through win probablities of each racer  
  // and converts win % probability to money line odds
  const oddsList = state.probability.map(data => {
    let odds = data.probability;
    let convertedOdds = "";

    if (odds > 50) {
      convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
    } else if (odds < 50) {
      convertedOdds = `+ ${((100 - odds) / odds * 100).toFixed(0)}`;
    } else {
      convertedOdds = 0;
    }

    return (
      <p>{convertedOdds}</p>
    )
  })


  return (
    <>
      race:
      <p>{state.stage}</p>
      <div className='odds-list'>
        <div>
          {racerList}
        </div>
        <div>
          {oddsList}
        </div>
      </div>
    </>
  )
}
