import { React, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TopNav from './components/NavBar.js'
import RaceOdds from './components/RaceOdds'
// import CircularIndeterminate from './components/Loading';
import getInfo from './api/getInfo';

function App() {
  const { getRaceInfo, getSeasonInfo } = getInfo()
  const [state, setState] = useState({
    stage: "",
    racers: [],
    probability: [],
    races: []
  });

  console.log("app state", state);

  useEffect(() => {
    getRaceInfo()
      .then(prev => {
        setState(
          { ...prev, stage: prev.data.stage.parents[0].description, racers: prev.data.probabilities.markets[1].outcomes, probability: prev.data.probabilities.markets[1].outcomes }
        )
      })
  }, [])

  return (
    <div className="App">
      <TopNav />
      <main>
        <div className="content-body">
          <p className='race'>{state.stage}</p>

          <RaceOdds probabilities={state.probability} racerList={state.racers} />
          <SearchBar racerList={state.racers}/>

        </div>
      </main>

    </div>
  );
}

export default App;
