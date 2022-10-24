import { React, useEffect, useState } from 'react';
import './App.css';
import RaceInfo from './components/RaceInfo';
import SearchBar from './components/SearchBar';
import TopNav from './components/NavBar.js'


function App() {
  // const[raceInfo, setRaceInfo] = useState(null)
  // const {
  //   state,
  //   oddsList,
  //   racerList
  // } = RaceInfo();

  useEffect(() => {
    // setRaceInfo(RaceInfo())
    // console.log(raceInfo)
    // console.log(racerList)
  }, [])

  // console.log(racerList)
  // const renderRacers = racerList.map(data => {
  //   return (
  //     <p>{data}</p>
  //   )
  // })


  return (
    <div className="App">
      <TopNav />
      <div className="content-body">
        <p className='race'>Test</p>
        {/* <p className='race'>{state.stage}</p> */}
        <div className='odds-list'>
          <div className='grid-container'>
            {/* <div className='grid-odds'> */}
            {/* {oddsList} */}
            {/* </div> */}
            {/* <div className='grid-name'> */}
            {/* {renderRacers} */}
            {/* </div> */}
          </div>
        </div>
        {/* {racerList && <SearchBar racerList={racerList} />} */}
        {<SearchBar />}
      </div>
    </div>
  );
}

export default App;
