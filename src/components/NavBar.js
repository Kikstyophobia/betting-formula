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
    if (betDriver.name && results[0] && bet) {
      let odds = betDriver.odds;
      let convertedOdds = "";
      let betAmount = Number(bet.slice(1));

      if (odds > 50) {
        convertedOdds = Math.round(betAmount / Number((odds / (100 - odds) * 100) / 100));
      } else if (odds < 50) {
        convertedOdds = Math.round(betAmount * Number(((100 - odds) / odds * 100).toFixed() / 100));
      } 

      if (betDriver.name === results[0].name) {
        setBalance(convertedOdds + balance);
      } else {
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