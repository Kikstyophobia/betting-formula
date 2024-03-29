import { React, useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SeasonContext } from '../contexts/SeasonContext';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { RenderResultsContext } from '../contexts/RenderResultsContext';
import { BetContext } from '../contexts/BetContext';
import { DriverContext } from '../contexts/DriverContext';
import { ResultsContext } from '../contexts/ResultsContext';

export default function SelectRace() {
  const [seasonRaces, setSeasonRaces] = useContext(SeasonContext);
  const [race, setRace] = useContext(CurrentRaceContext);
  const [render, setRender] = useContext(RenderResultsContext);
  const [bet, setBet] = useContext(BetContext);
  const [driver, setDriver] = useContext(DriverContext);
  const [results, setResults] = useContext(ResultsContext);

 
  const races = seasonRaces.map(race => {
    return race.description;
  })

  useEffect(() => {
    seasonRaces.forEach(doc => {
      if (race === doc.description) {
        setResults(doc.results);
      }
    })
  }, [race])


  function clickEvent(newValue) {
    setRender(false);
    setRace(newValue);
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
        onChange={(event, newValue) => {
          clickEvent(newValue)
        }}
        renderInput={(params) => (
          <TextField
            id='race-field'
            value="ass"
            {...params}
            placeholder='Select a race'
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  )
}