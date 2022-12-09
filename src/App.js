import { React, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TopNav from './components/NavBar.js'
import RaceOdds from './components/RaceOdds'
import useInfo from './api/useInfo';
import Loading from './components/Loading';
import { db } from '.';
import { collection, doc, getDocs } from 'firebase/firestore';
import SelectRace from './components/SelectRace';
import { SeasonContext } from './contexts/SeasonContext';
import { CurrentRaceContext } from './contexts/CurrentRaceContext';

function App() {
  const [race, setRace] = useState('');
  const [seasonRaces, setSeasonRaces] = useState('');

  useEffect(() => {
    getSeason();
  }, []);
  
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
              {seasonRaces ? <SelectRace /> : <Loading/>}
              {seasonRaces && race ? <RaceOdds /> : <p></p>}
              {seasonRaces && race ? <SearchBar /> : <p className='message'>Welcome to Betting Formula! Please select a race to get started.</p>}
            </div>

          </CurrentRaceContext.Provider>
        </SeasonContext.Provider>
      </main>

    </div>
  );
}


export default App;