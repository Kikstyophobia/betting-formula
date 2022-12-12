import { React, useContext, useEffect, useState } from 'react';
import { BalanceContext } from '../contexts/BalanceContext';
import { BetContext } from '../contexts/BetContext';
import { BetDriverContext } from '../contexts/BetDriverContext';

export default function TopNav() {
  const [balance, setBalance] = useContext(BalanceContext);
  const [betDriver] = useContext(BetDriverContext);
  const [bet] = useContext(BetContext);
  
  // useEffect(() => {
  //   console.log("nav driver", betDriver);
  // }, [betDriver])

  // useEffect(() => {
  //   console.log("nav bet", bet)
  // }, [bet])





  return (
    <span className='nav-main'>
      <p className='app-name'>Betting Formula</p>
      <p className='balance'>Current Balance: ${balance}</p>
    </span>
  )
}