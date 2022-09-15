import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function RaceInfo() {
  const api_key = process.env.REACT_APP_API_KEY;
  const [race, setRace] = useState();
  const [racers, setRacers] = useState([]);
  const [odds, setOdds] = useState();
  // const [state, setState] = useState({
  //   race: "",
  //   racers: [],
  //   probability: []
  // })


  useEffect(() => {
    // axios.get(`http://api.sportradar.us/formula1/trial/v2/en/sport_events/sr:stage:686252/probabilities.json?api_key=http://api.sportradar.us/formula1/trial/v2/en/sport_events/sr:stage:686252/probabilities.json?api_key=${api_key}`)
    axios.get(`http://localhost:3001/info`)
      .then(data => {
        console.log("data:", data.data[0].probabilities.markets[1]);

        let racers = [];
        racers = data.data[0].probabilities.markets[1].outcomes.map(info => {
          return info.name;
        })

        let odds = [];
        odds = data.data[0].probabilities.markets[1].outcomes.map(info => {
          return info.probability;
        })

        setOdds(odds)
        setRacers(racers)
        setRace(data.data[0].probabilities.markets[1].description);
        
      })
      .catch(error => {
        console.log(error);
      })

  }, [])

  const racerList = racers.map(names => {
    return (
      <p>{names}</p>
    )
  })

  const oddsList = odds.map(odds => {
    const convertedOdds = odds * 2
    return (
      <p>{convertedOdds}</p>
    )
  })


  return (
    <>
      <p>{race}</p>
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
