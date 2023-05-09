import { React, useContext, useEffect, useState } from 'react';
import { BalanceContext } from '../contexts/BalanceContext';
import { BetContext } from '../contexts/BetContext';
import { BetDriverContext } from '../contexts/BetDriverContext';
import { ResultsContext } from '../contexts/ResultsContext';
import { RenderResultsContext } from '../contexts/RenderResultsContext';
import { WinAmountContext } from '../contexts/WinAmountContext';
import BetHistory from './BetHistory';


export default function TopNav() {
  const [balance, setBalance] = useContext(BalanceContext);
  const [betDriver] = useContext(BetDriverContext);
  const [bet] = useContext(BetContext);
  const [results] = useContext(ResultsContext);
  const [render] = useContext(RenderResultsContext);
  const [winAmount, setWinAmount] = useContext(WinAmountContext);
  const [history, setHistory] = useState([]);


  function refreshPage() {
    window.location.reload(false);
  }


  useEffect(() => {
    if (betDriver.name && results[0] && bet && render) {
      let odds = betDriver.odds;
      let convertedOdds = "";
      let betAmount = Number(bet.slice(1));
      let winLose = "";
      let amount = "";

      if (odds > 50) {
        convertedOdds = Math.round(betAmount / Number((odds / (100 - odds) * 100) / 100));
      } else if (odds < 50) {
        convertedOdds = Math.round(betAmount * Number(((100 - odds) / odds * 100).toFixed() / 100));
      }

      if (betDriver.name === results[0].name) {
        winLose = "Win";
        amount = balance + convertedOdds;
        setWinAmount(convertedOdds);
        setBalance(balance + convertedOdds);
      } else {
        winLose = "Lose";
        amount = balance - betAmount;
        setBalance(balance - betAmount);
      }
      setHistory([{ race: betDriver.race[0], betDriver: betDriver.name, winLose: winLose, bet: bet, balance: `$${amount}` }, ...history]);
    }

  }, [render]);

  return (
    <span className='nav-main'>
      <div className='app-name' onClick={refreshPage}><strong>Betting Formula</strong></div>
      <div className='balance'>
        <BetHistory history={history} />
        <p>Balance: ${balance}</p>
      </div>
    </span>
  )
}