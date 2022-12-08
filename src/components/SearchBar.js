import { React, useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SeasonContext } from '../contexts/SeasonContext';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';


export default function SearchBar() {
  const seasonRaces = useContext(SeasonContext);
  const race = useContext(CurrentRaceContext);
  const [bet, setBet] = useState();
  const [betInput, setBetInput] = useState();
  const [driver, setDriver] = useState();
  const [driverInput, setDriverInput] = useState();
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

  const betAmounts = ['$20', '$50', '$100', '$250', '$500', '$1000'];

  return (
    <>
      {/* {countries} */}
      {!cancelled ?
        <div className='search-area'>
          <div className='bet-box'>
            {/* DRIVER SELECT */}
            <div className='driver-select'>
              <br />
              <Autocomplete
                value={driver}
                onChange={(event, newValue) => {
                  setDriver(newValue);
                }}
                inputValue={driverInput}
                onInputChange={(event, newInputValue) => {
                  console.log(newInputValue);
                  setDriverInput(newInputValue);
                }}
                id="controllable-states-demo"
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
                  setBet(newValue);
                }}
                inputValue={betInput}
                onInputChange={(event, newInputValue) => {
                  setBetInput(newInputValue);
                }}
                id="controllable-states-demo"
                options={betAmounts}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Bet Amount" />}
              />
              <button className='bet-button'>Place Bet</button>
            </div>
          </div>
        </div> : <p></p>}
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
    </>
  );
}

