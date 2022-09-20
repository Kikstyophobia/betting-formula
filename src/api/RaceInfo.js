import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function RaceInfo() {
  const api_key = process.env.REACT_APP_API_KEY;
  // const [race, setRace] = useState();
  // const [racers, setRacers] = useState([]);
  // const [odds, setOdds] = useState();
  // const [state, setState] = useState({
  //   race: "",
  //   racers: [],
  //   probability: []
  // })


  useEffect(() => {
    axios.get(`/api`)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })

  }, [])

  // const racerList = racers.map(names => {
  //   return (
  //     <p>{names}</p>
  //   )
  // })

  // const oddsList = odds.map(odds => {
  //   const convertedOdds = odds * 2
  //   return (
  //     <p>{convertedOdds}</p>
  //   )
  // })


  return (
    <>
      {/* <p>{race}</p> */}
      {/* <div className='odds-list'>
        <div>
          {racerList}
        </div>
        <div>
          {oddsList}
        </div>
      </div> */}
    </>
  )
}
