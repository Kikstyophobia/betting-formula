import { React } from 'react';

export default function RaceOdds(state) {

  // maps through racers
  const racerList = state.racerList.map(data => {
    return (
      <p className='grid-item'>{data.name}</p>
    )
  })

  // maps though racer win odds for a given race
  const oddsList = state.probabilities.map(data => {
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
      <p className='grid-item'>{convertedOdds}</p>
    )
  })

  return (
    <div className='grid-container'>

      {/* <div className='grid'> */}
      <>
        {racerList}
        {oddsList}
      </>
      {/* </div> */}
      
      {/* <div className='grid-odds'> */}
      {/* </div> */}

    </div>
  )

}