import { React, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TopNav from './components/NavBar.js'
import RaceOdds from './components/RaceOdds'
import Loading from './components/Loading';
import Results from './components/Results';
import { db } from '.';
import { collection, getDocs } from 'firebase/firestore';
import SelectRace from './components/SelectRace';
import { SeasonContext } from './contexts/SeasonContext';
import { CurrentRaceContext } from './contexts/CurrentRaceContext';
import { BetContext } from './contexts/BetContext';
import { DriverContext } from './contexts/DriverContext';
import { BalanceContext } from './contexts/BalanceContext';
import { BetDriverContext } from './contexts/BetDriverContext';
import { ResultsContext } from './contexts/ResultsContext';
import { RenderResultsContext } from './contexts/RenderResultsContext';

function App() {
  const [race, setRace] = useState('');
  const [seasonRaces, setSeasonRaces] = useState('');
  const [bet, setBet] = useState(null);
  const [driver, setDriver] = useState(null);
  const [balance, setBalance] = useState(1000);
  const [results, setResults] = useState([]);
  const [render, setRender] = useState(false);
  const [betDriver, setBetDriver] = useState({
    name: "",
    odds: ""
  })

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
      <BetContext.Provider value={[bet, setBet]}> {/* State for the selected Bet amount */}
        <DriverContext.Provider value={[driver, setDriver]}> {/* State for all Drivers in a selected race */}
          <SeasonContext.Provider value={[seasonRaces]}> {/* State for all the info in a Season via Firestore request - data, probabilities, results */}
            <BalanceContext.Provider value={[balance, setBalance]}> {/* State for player funds */}
              <BetDriverContext.Provider value={[betDriver, setBetDriver]}> {/* State for the selected Driver */}
                <ResultsContext.Provider value={[results, setResults]}> {/* State for results of a selected race */}

                  <TopNav />
                  <main>
                    <RenderResultsContext.Provider value={[render, setRender]}> {/* State for rendering Results after placing bet */}
                      <CurrentRaceContext.Provider value={[race, setRace]}> {/* State for selected Race */}

                        <div className="content-body">
                          <p className='race'>{race}</p>
                          {seasonRaces ? <SelectRace /> : <Loading />}
                          {seasonRaces && race ? <RaceOdds /> : <p></p>}
                          {seasonRaces && race ? <SearchBar /> :
                            <p className='message'>
                              Welcome to Betting Formula! Please select a race to get started. <br></br><br></br>
                              How To Play: <br></br>
                              1. Select Race to bet on <br></br>
                              2. Select Driver to bet on <br></br>
                              3. Select Amount to bet
                            </p>}
                          {render ? <Results /> : <p></p>}
                        </div>

                      </CurrentRaceContext.Provider>
                    </RenderResultsContext.Provider>
                  </main>

                </ResultsContext.Provider>
              </BetDriverContext.Provider>
            </BalanceContext.Provider>
          </SeasonContext.Provider>
        </DriverContext.Provider>
      </BetContext.Provider>
    </div>
  );
}


export default App;