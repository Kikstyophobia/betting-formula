import { React, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../index';

export default function RaceOdds() {
  const [odds, setOdds] = useState();

  useEffect(() => {
    getOdds();
  }, [])

  useEffect(() => {
    console.log("odds", odds[0].data);
    // const wtf = odds.map(data => {
    //   console.log("bruh", data);
    // })
  }, [odds])

  function getOdds() {
    const oddsCollectionRef = collection(db, '2022');
    getDocs(oddsCollectionRef)
      .then(response => {
        const oddsResponse = response.docs.map(doc => ({
          data: doc.data().probabilities,
          id: doc.id
        }));
        setOdds(oddsResponse)
      })
      .catch(error => console.log(error.message))
  }

  // let oddsList = odds.map((data) => {
  // let odds = data.data.probabilities.probability;
  // console.log("daya", data.data);
  // let convertedOdds = "";

  // if (odds > 50) {
  //   convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
  // } else if (odds < 50) {
  //   convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
  // } else {
  //   convertedOdds = 0;
  // }
  // });


  // let convertedOdds = "";

  // if (odds > 50) {
  //   convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
  // } else if (odds < 50) {
  //   convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
  // } else {
  //   convertedOdds = 0;
  // }
 

  return (
    <div className='odds-item'>
      {/* {odds.map(data => <p key={data.id}>{}</p>) } */}
      {/* <p className='grid-item'>{props.racerList}</p> */}
      {/* {odds.map((data) => {
        console.log("inside", data.data);

        let convertedOdds = "";

        if (data.probabilties > 50) {
          convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
        } else if (odds < 50) {
          convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
        } else {
          convertedOdds = 0;
        }
        <p className='grid-item'>{convertedOdds}</p>
      })} */}
    </div>
  )
}