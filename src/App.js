import { React, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
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

  useEffect(() => {
    getSeason();
  }, [])

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
                {seasonRaces && race ? <RaceOdds /> : <p>Select a race</p>}
              </div>


              {seasonRaces && race ? <SearchBar /> : <p>Welcome to Betting Formula! Please select a race.</p>}

            </div>
          </CurrentRaceContext.Provider>
        </SeasonContext.Provider>
      </main>

    </div>
  );
}


export default App;