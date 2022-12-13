import { React, useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SeasonContext } from '../contexts/SeasonContext';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { BetContext } from '../contexts/BetContext';
import { DriverContext } from '../contexts/DriverContext';
import { BetDriverContext } from '../contexts/BetDriverContext';
import { RenderResultsContext } from '../contexts/RenderResultsContext';


export default function SearchBar() {
  const seasonRaces = useContext(SeasonContext);
  const race = useContext(CurrentRaceContext);
  const [bet, setBet] = useContext(BetContext);
  const [driver, setDriver] = useContext(DriverContext);
  const [betDriver, setBetDriver] = useContext(BetDriverContext);
  const [render, setRender] = useContext(RenderResultsContext);
  const [driverList, setDriverList] = useState([]);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    seasonRaces.forEach(doc => {
      doc.map(data => {
        if (race[0] === data.description) {
          if (data.probabilities === null) {
            setCancelled(true);
          } else {
            setCancelled(false);
            setDriverList(data.probabilities);
          }
        }
      })
    })
  }, [race]);


  let displayDrivers = driverList.map(data => {
    return data.name;
  })

  function driverOdds() {
    let driver = document.getElementById('driver-select-state').value;
    driverList.map(data => {
      if (data.name === driver) {
        setBetDriver({
          name: data.name,
          odds: data.probability
        })
      }
    })
    setRender(true);
  }

  const betAmounts = ['$20', '$50', '$100', '$250', '$500', '$1000'];

  return (
    <>
      {!cancelled ?
        <div className='search-area'>
          <div className='bet-box'>
            {/* DRIVER SELECT */}
            <div className='driver-select'>
              <br />
              <Autocomplete
                value={driver}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setDriver(newValue);
                }}
                id="driver-select-state"
                options={displayDrivers}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Choose a driver" />}
              />
            </div>

            {/* BET SELECT */}
            <div className='bet-select'>
              <br />
              <Autocomplete
                value={bet}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setBet(newValue);
                }}
                id="bet-select-state"
                options={betAmounts}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Bet Amount" />}
              />
              <button className='bet-button' onClick={driverOdds}>Place Bet</button>
            </div>
          </div>
        </div> : <p></p>}
    </>
  );
}

