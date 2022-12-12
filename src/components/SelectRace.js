import { React, useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SeasonContext } from '../contexts/SeasonContext';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';

export default function SelectRace() {
  const [seasonRaces, setSeasonRaces] = useContext(SeasonContext);
  const [race, setRace] = useContext(CurrentRaceContext);

  const races = seasonRaces.map(race => {
    return race.description;
  })

  useEffect(() => {
    console.log(race);
  }, [race])

  function clickEvent() {
    setRace(document.getElementById('country-select-demo').value);
  }

  return (
    <div className='race-search'>
      <Autocomplete
        id="country-select-demo"
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