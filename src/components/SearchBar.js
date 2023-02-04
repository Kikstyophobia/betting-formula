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
import { ProbabilitiesContext } from '../contexts/ProbablilitiesContext';


export default function SearchBar() {
  const [seasonRaces] = useContext(SeasonContext);
  const race = useContext(CurrentRaceContext);
  const [bet, setBet] = useContext(BetContext);
  const [driver, setDriver] = useContext(DriverContext);
  const [betDriver, setBetDriver] = useContext(BetDriverContext);
  const [render, setRender] = useContext(RenderResultsContext);
  const [balance] = useContext(BalanceContext);
  const [probabilities] = useContext(ProbabilitiesContext)
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
          name: data.name,
          odds: data.probability
        })
      }
    })
    setRender(true);
  }

  let potentialEarnings;
  const displayDriverOdds = probabilities.map(data => {
    let odds = data.probability;
    let convertedOdds = "";
    if (driver === data.name) {

      if (odds > 50) {
        convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
      } else if (odds < 50) {
        convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
      } else {
        convertedOdds = 0;
      }
    }

    if (bet && driver === data.name) {
      let betAmount = Number(bet.slice(1));

      if (odds > 50) {
        potentialEarnings = Math.round(betAmount / Number((odds / (100 - odds) * 100) / 100));
      } else if (odds < 50) {
        potentialEarnings = Math.round(betAmount * Number(((100 - odds) / odds * 100).toFixed() / 100));
      }
    }

    return convertedOdds;
  })


  const betAmounts = ['$20', '$50', '$100', '$250', '$500', '$1000'];
  const showAmounts = betAmounts.filter(amount => Number(amount.slice(1)) <= balance);
  const buttonExists = document.getElementsByClassName("bet-button");


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
              <button type="button" className='bet-button' disabled={balance > 0 ? false : true} onClick={driver && bet ? driverOdds : null}>Place Bet</button>
            </div>
          </div>
        </div> : <p></p>}
      {bet && driver && buttonExists.length > 0 ?
        <div>
          <h3><strong>Projected Results</strong></h3>
          <div className="bet-summary projected">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"><u>Driver Selected</u></th>
                  <th scope="col"><u>Driver Odds</u></th>
                  <th scope="col"><u>Bet Amount</u></th>
                  {/* {betDriverResult[0] === 1 && <th scope="col"><u>Amount Won</u></th>} */}
                  <th scope="col"><u>Potential Earnings</u></th>
                  <th scope="col"><u>Final Balance</u></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{driver}</td>
                  <td>{displayDriverOdds}</td>
                  <td>{bet}</td>
                  {/* {betDriverResult[0] === 1 && <td>${winAmount}</td>} */}
                  <td>${potentialEarnings}</td>
                  <td>${balance + potentialEarnings}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        : null}

    </>
  );
}

