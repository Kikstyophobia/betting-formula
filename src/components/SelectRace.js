import { React, useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SeasonContext } from '../contexts/SeasonContext';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { RenderResultsContext } from '../contexts/RenderResultsContext';
import { BetContext } from '../contexts/BetContext';
import { DriverContext } from '../contexts/DriverContext';

export default function SelectRace() {
  const [seasonRaces, setSeasonRaces] = useContext(SeasonContext);
  const [race, setRace] = useContext(CurrentRaceContext);
  const [render, setRender] = useContext(RenderResultsContext);
  const [bet, setBet] = useContext(BetContext);
  const [driver, setDriver] = useContext(DriverContext);

  const races = seasonRaces.map(race => {
    return race.description;
  })

  useEffect(() => {
    console.log(race);
  }, [race])


  function clickEvent() {
    setRender(false);
    setRace(document.getElementById('country-select').value);
    setDriver(null);
    setBet(null);
  }

  return (
    <div className='race-search'>
      <Autocomplete
        id="country-select"
        sx={{ width: 350 }}
        options={races}
        autoHighlight
        renderInput={(params) => (
          <TextField
            id='race-field'
            {...params}
            placeholder='Select a race'
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
      <button className='race-button' onClick={clickEvent}>Select Race</button>
    </div>
  )
}