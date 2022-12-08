import { React, useEffect, useState, createContext } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TopNav from './components/NavBar.js'
import RaceOdds from './components/RaceOdds'
import useInfo from './api/useInfo';
import { db } from '.';
import { collection, doc, getDocs } from 'firebase/firestore';
import SelectRace from './components/SelectRace';
import { SeasonContext } from './contexts/SeasonContext';
import { CurrentRaceContext } from './contexts/CurrentRaceContext';

function App() {
  const [state, setState] = useState({
    stage: "",
    racers: [],
    probability: []
  });

  const [race, setRace] = useState();
  const [seasonRaces, setSeasonRaces] = useState();
  // const [races, setRaces] = useState([]);
  // const [currentRace, setCurrentRace] = useState();

  useEffect(() => {
    getSeason();
  }, [])

  useEffect(() => {
    // console.log("app", race);
    // console.log(seasonRaces);
  }, [seasonRaces])


  function getSeason() {
    const seasonCollectionRef = collection(db, '2022');

    getDocs(seasonCollectionRef)
      .then(response => {
        let info = [];
        response.docs.map(doc => (
          info.push({ ...doc.data(), id: doc.id, description: doc.data().data.description })
        ))
        setSeasonRaces(info)
      })
      .catch(error => console.log(error.message))
  }

  // useEffect(() => {
  //   getRaceInfo()
  //     .then(prev => {
  //       setState(
  //         {
  //           ...prev,
  //           stage: prev.data.stage.parents[0].description,
  //           racers: prev.data.probabilities.markets[1].outcomes,
  //           probability: prev.data.probabilities.markets[1].outcomes
  //         }
  //       )
  //     })
  // }, [])

  // const displayRaceOdds = seasonRaces.map(odds => {

    // return (
    //   <RaceOdds
    //     key={odds.name}
    //     probabilities={odds.probability}
    //     racerList={odds.name}
    //   />
    // )
  // })


  return (
    <div className="App">
      <TopNav />
      <main>
        <SeasonContext.Provider value={[seasonRaces]}>
          <CurrentRaceContext.Provider value={[race, setRace]}>

            <div className="content-body">
              <p className='race'>{race}</p>

              {/* Race Select */}
              {seasonRaces ? <SelectRace /> : <p>Loading...</p>}
              <div className='grid-container'>
                {/* {race ? <RaceOdds /> : <p>Select a Race</p>} */}
                {seasonRaces && race ? <RaceOdds /> : <p>Loading...</p>}
              </div>


              <SearchBar racers={state.racers} />

            </div>
          </CurrentRaceContext.Provider>
        </SeasonContext.Provider>
      </main>

    </div>
  );
}


export default App;