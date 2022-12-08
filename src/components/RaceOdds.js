import { React, useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../index';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { SeasonContext } from '../contexts/SeasonContext';

export default function RaceOdds(props) {
  const [probabilities, setProbabilities] = useState();
  const race = useContext(CurrentRaceContext);
  const seasonRaces = useContext(SeasonContext);

  useEffect(() => {
    seasonRaces.forEach(doc => {
      doc.map(data => {
        if (race[0] === data.description) {
          // setprobabilities(data.)
          console.log(data);
          setProbabilities(data.probabilities)
        }
      })
    })
  }, [race])

  useEffect(() => {
    console.log("probabilities:", probabilities);
  }, [probabilities])




  // maps through win probablities of each racer per race
  // and converts win % probability to money line odds
  const displayOdds = probabilities.map(data => {
    let odds = data.probability
    let convertedOdds = "";

    if (odds > 50) {
      convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
    } else if (odds < 50) {
      convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
    } else {
      convertedOdds = 0;
    }
    return convertedOdds
  })

  const displayRacers = probabilities.map(data => {
    return data.name
  })


  return (
    <div className='odds-item'>
      <p className='grid-item'>{displayRacers}</p>
      <p className='grid-item'>{displayOdds}</p>
    </div>
  )
}