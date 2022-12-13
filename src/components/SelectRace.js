import { React, useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SeasonContext } from '../contexts/SeasonContext';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { RenderResultsContext } from '../contexts/RenderResultsContext';

export default function SelectRace() {
  const [seasonRaces, setSeasonRaces] = useContext(SeasonContext);
  const [race, setRace] = useContext(CurrentRaceContext);
  const [render, setRender] = useContext(RenderResultsContext);

  const races = seasonRaces.map(race => {
    return race.description;
  })

  useEffect(() => {
    console.log(race);
  }, [race])

  function clickEvent() {
    setRender(false);
    setRace(document.getElementById('country-select').value);
    // setRace(document.getElementById('country-select-demo').value); clear value in driver and bet select
    // setRace(document.getElementById('country-select-demo').value);
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