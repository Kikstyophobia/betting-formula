import { React, useContext, useEffect, useState } from 'react';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { ProbabilitiesContext } from '../contexts/ProbablilitiesContext';
import { SeasonContext } from '../contexts/SeasonContext';

export default function RaceOdds() {
  const [probabilities, setProbabilities] = useContext(ProbabilitiesContext);
  const race = useContext(CurrentRaceContext);
  const [seasonRaces] = useContext(SeasonContext);
  const [cancelled, setCancelled] = useState(false);


  useEffect(() => {
    seasonRaces.forEach(doc => {
      if (race[0] === doc.description) {
        if (doc.probabilities === null) {
          setCancelled(true);
        } else {
          setCancelled(false);
          setProbabilities(doc.probabilities);
        }
      }
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
      <div className='odds-item' key={data.name}>
        <p className='name'>{data.name}</p>
        <p className='odds'>{convertedOdds}</p>
      </div>
    )
  })


  return (
    <>
      {!cancelled ?
        <div className='grid-container'>
          {displayOdds}
        </div>
        : <p className='message'>Race cancelled, no information available.</p>}
    </>
  )
}