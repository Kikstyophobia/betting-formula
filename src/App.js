import { React, useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
import { WinAmountContext } from './contexts/WinAmountContext';

function App() {
  const [race, setRace] = useState(null);
  const [seasonRaces, setSeasonRaces] = useState('');
  const [bet, setBet] = useState(null);
  const [driver, setDriver] = useState(null);
  const [balance, setBalance] = useState(1000);
  const [results, setResults] = useState([]);
  const [render, setRender] = useState(false);
  const [winAmount, setWinAmount] = useState(null);
  const [betDriver, setBetDriver] = useState({
    name: "",
    odds: ""
  })

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Titillium Web',
        textTransform: 'none',
        fontSize: 16,
      },
    },
  });

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
                  <RenderResultsContext.Provider value={[render, setRender]}> {/* State for rendering Results after placing bet */}
                    <WinAmountContext.Provider value={[winAmount, setWinAmount]}> {/* State for setting the amount of money won per wager */}
                      <ThemeProvider theme={theme}>
                        <TopNav />
                        <main>
                          <CurrentRaceContext.Provider value={[race, setRace]}> {/* State for selected Race */}

                            <div className="content-body">
                              <p className='race'>{race}</p>
                              {seasonRaces ? <SelectRace /> : <Loading />}
                              {seasonRaces && race ? <RaceOdds /> : <p></p>}
                              {seasonRaces && race ? <SearchBar /> :
                                <div className='message'>
                                  Welcome to Betting Formula! Please select a race to get started. <br></br><br></br>
                                  <u><strong>How To Play:</strong></u> <br></br>
                                  1. Select Race to bet on <br></br>
                                  2. Select Driver to win the race <br></br>
                                  3. Select Amount to bet <br></br>
                                  <p><strong>Note:</strong> If you run out of funds, refresh the page by clicking on the title.</p>
                                  <p>Designed and created by Calvin Chung
                                    <br></br>
                                    <a href="https://www.linkedin.com/in/calvinhwchung" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    <br></br>
                                    <a href="https://github.com/Kikstyophobia/betting-formula" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                                  </p>
                                </div>
                              }
                              {render ? <Results /> : <p></p>}
                            </div>

                          </CurrentRaceContext.Provider>
                        </main>
                      </ThemeProvider>
                    </WinAmountContext.Provider>
                  </RenderResultsContext.Provider>
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