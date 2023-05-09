import { React, useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SeasonContext } from '../contexts/SeasonContext';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { BetContext } from '../contexts/BetContext';
import { DriverContext } from '../contexts/DriverContext';
import { BetDriverContext } from '../contexts/BetDriverContext';
import { RenderResultsContext } from '../contexts/RenderResultsContext';
import { BalanceContext } from '../contexts/BalanceContext';

export default function SearchBar() {
  const [seasonRaces] = useContext(SeasonContext);
  const race = useContext(CurrentRaceContext);
  const [bet, setBet] = useContext(BetContext);
  const [driver, setDriver] = useContext(DriverContext);
  const [betDriver, setBetDriver] = useContext(BetDriverContext);
  const [render, setRender] = useContext(RenderResultsContext);
  const [balance] = useContext(BalanceContext);
  const [driverList, setDriverList] = useState([]);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    seasonRaces.forEach(doc => {
      if (race[0] === doc.description) {
        if (doc.probabilities === null) {
          setCancelled(true);
        } else {
          setCancelled(false);
          setDriverList(doc.probabilities);
        }
      }
    })
  }, [race]);

  let displayDrivers = driverList.map(data => {
    return data.name;
  })

  function driverOdds() {
    let driver = document.getElementById('driver-select-value').value;
    driverList.map(data => {
      if (data.name === driver) {
        setBetDriver({
          race: race,
          name: data.name,
          odds: data.probability
        })
      }
    })
  }

  const betAmounts = ['$20', '$50', '$100', '$250', '$500', '$1000'];
  const showAmounts = betAmounts.filter(amount => Number(amount.slice(1)) <= balance);

  return (
    <>
      {!cancelled && !render ?
        <div className='search-area'>
          <div className='bet-box'>
            {/* DRIVER SELECT */}
            <div className='driver-select'>

              <Autocomplete
                className='driver-dropdown'
                disabled={balance > 0 ? false : true}
                value={driver}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setDriver(newValue);
                }}
                id="driver-select-value"
                options={displayDrivers}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Choose a driver" />}
              />
            </div>

            {/* BET SELECT */}
            <div className='bet-select'>

              <Autocomplete
                className='bet-dropdown'
                disabled={balance > 0 ? false : true}
                value={bet}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setBet(newValue);
                }}
                id="bet-select-value"
                options={showAmounts}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Bet Amount" />}
              />
              <button type="button" className='bet-button' disabled={balance > 0 && bet && driver ? false : true}
                onClick={() => {
                  driverOdds();
                  setRender(true);
                }
                }>Place Bet</button>
            </div>
          </div>
        </div> : null}
    </>
  );
}