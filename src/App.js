import { React, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TopNav from './components/NavBar.js'
import RaceOdds from './components/RaceOdds'
// import CircularIndeterminate from './components/Loading';
import useInfo from './api/useInfo';

function App() {
  const { getRaceInfo, getSeasonRaces } = useInfo();
  const [state, setState] = useState({
    stage: "",
    racers: [],
    probability: []
  });

  useEffect(() => {
    getRaceInfo()
      .then(prev => {
        setState(
          {
            ...prev,
            stage: prev.data.stage.parents[0].description,
            racers: prev.data.probabilities.markets[1].outcomes,
            probability: prev.data.probabilities.markets[1].outcomes
          }
        )
      })
  }, [])

  const displayRaceOdds = state.probability.map(odds => {
    return (
      <RaceOdds
        key={odds.name}
        probabilities={odds.probability}
        racerList={odds.name}
      />
    )
  })

  return (
    <div className="App">
      <TopNav />
      <main>
        <div className="content-body">
          <p className='race'>{state.stage}</p>
          <div className='grid-container'>
            {displayRaceOdds}
          </div>
          <SearchBar racers={state.racers} />

        </div>
      </main>

    </div>
  );
}

export default App;
