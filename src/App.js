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
import { BetContext } from './contexts/BetContext';
import { DriverContext } from './contexts/DriverContext';
import { BalanceContext } from './contexts/BalanceContext';
import { BetDriverContext } from './contexts/BetDriverContext';
import Results from './components/Results';

function App() {
  const [race, setRace] = useState('');
  const [seasonRaces, setSeasonRaces] = useState('');
  const [bet, setBet] = useState(null);
  const [driver, setDriver] = useState(null);
  const [balance, setBalance] = useState(1000);
  const [betDriver, setBetDriver] = useState({
    name: "",
    odds: ""
  })

  useEffect(() => {
    getSeason();
  }, []);


  useEffect(() => {
    console.log("driver", driver);
  }, [driver])

  useEffect(() => {
    console.log("bet", bet);
  }, [bet])

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
      <BetContext.Provider value={[bet, setBet]}>
        <DriverContext.Provider value={[driver, setDriver]}>
          <SeasonContext.Provider value={[seasonRaces]}>
            <BalanceContext.Provider value={[balance, setBalance]}>
              <BetDriverContext.Provider value={[betDriver, setBetDriver]}>

                <TopNav />
                <main>
                  <CurrentRaceContext.Provider value={[race, setRace]}>

                    <div className="content-body">
                      <p className='race'>{race}</p>
                      {seasonRaces ? <SelectRace /> : <Loading />}
                      {seasonRaces && race ? <RaceOdds /> : <p></p>}
                      {seasonRaces && race ? <SearchBar /> : <p className='message'>Welcome to Betting Formula! Please select a race to get started.</p>}
                      {seasonRaces && race ? <Results /> : <p></p>}
                    </div>

                  </CurrentRaceContext.Provider>
                </main>

              </BetDriverContext.Provider>
            </BalanceContext.Provider>
          </SeasonContext.Provider>
        </DriverContext.Provider>
      </BetContext.Provider>
    </div>
  );
}


export default App;