import { React, useContext, useEffect, useState } from 'react';
import { BalanceContext } from '../contexts/BalanceContext';
import { BetContext } from '../contexts/BetContext';
import { BetDriverContext } from '../contexts/BetDriverContext';
import { ResultsContext } from '../contexts/ResultsContext';
import { SeasonContext } from '../contexts/SeasonContext';

export default function TopNav() {
  const [seasonRaces] = useContext(SeasonContext);
  const [balance, setBalance] = useContext(BalanceContext);
  const [betDriver] = useContext(BetDriverContext);
  const [bet] = useContext(BetContext);
  const [results] = useContext(ResultsContext);

  useEffect(() => {
    if (betDriver.name && results[0]) {
      let odds = betDriver.odds;
      let convertedOdds = "";
      let betAmount = Number(bet.slice(1));

      if (odds > 50) {
        convertedOdds = Number((betAmount * 2 - (odds / (100 - odds) * 100)).toFixed(0));
      } else if (odds < 50) {
        convertedOdds = Number(((100 - odds) / odds * 100).toFixed(0));
      } else {
        convertedOdds = 0;
      }

      if (betDriver.name === results[0].name) {
        console.log("win payout", convertedOdds)
        setBalance(convertedOdds + balance);
      } else {
        console.log("did not win")
        setBalance(balance - betAmount);
      }
    }
  }, [results, betDriver, bet])

  return (
    <span className='nav-main'>
      <p className='app-name'>Betting Formula</p>
      <p className='balance'>Current Balance: ${balance}</p>
    </span>
  )
}