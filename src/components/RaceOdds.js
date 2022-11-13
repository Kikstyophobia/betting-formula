import { React } from 'react';

export default function RaceOdds(props) {

  let odds = props.probabilities;
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
      <p className='grid-item'>{props.racerList}</p>
      <p className='grid-item'>{convertedOdds}</p>
    </div>
  )
}