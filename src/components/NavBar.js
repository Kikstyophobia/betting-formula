import React from 'react';

export default function TopNav() {
  let balance = 1000;

  return (
    <span className='nav-main'>
      <p className='app-name'>Betting Formula</p>
      <p className='balance'>Current Balance: ${balance}</p>
    </span>
  )
}