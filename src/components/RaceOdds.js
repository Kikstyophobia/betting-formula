import { React, useContext, useEffect, useState } from 'react';
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
    return (
      <div className='odds-item'>
        <p className='name'>{data.name}</p>
        <p className='odds'>{convertedOdds}</p>
      </div>
    )
  })

  return <div className='grid-container'>{!cancelled ? displayOdds : <p id='cancelled'>Race cancelled, no information available.</p>}</div>
}