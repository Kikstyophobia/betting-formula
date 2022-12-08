import { React, useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../index';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { SeasonContext } from '../contexts/SeasonContext';

export default function RaceOdds() {
  const [probabilities, setProbabilities] = useState([]);
  const race = useContext(CurrentRaceContext);
  const seasonRaces = useContext(SeasonContext);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    seasonRaces.forEach(doc => {
      doc.map(data => {
        if (race[0] === data.description) {
          if (data.probabilities === null) {
            setCancelled(true);
          } else {
            setCancelled(false);
            setProbabilities(data.probabilities);
          }
        }
      })
    })
  }, [race]);

  useEffect(() => {
    console.log("probabilities:", probabilities);
  }, [probabilities]);


  // maps through win probablities of each racer per race
  // and converts win % probability to money line odds
  const displayOdds = probabilities.map(data => {
    let odds = data.probability;
    let convertedOdds = "";

    if (odds > 50) {
      convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
    } else if (odds < 50) {
      convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
    } else {
      convertedOdds = 0;
    }
    return convertedOdds;
  })


  // maps through probabilities for racer names to pair with odds
  const displayRacers = probabilities.map(data => {
    return data.name;
  })


  return (
    <div className='odds-item'>
      <div className='grid-item'>{!cancelled ? displayRacers : <p id='cancelled'>Race cancelled, no information available.</p>}</div>
      <div className='grid-item'>{!cancelled ? displayOdds : <p></p>}</div>
    </div>
  )
}