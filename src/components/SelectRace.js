import { React, useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SeasonContext } from '../contexts/SeasonContext';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';

export default function SelectRace() {
  const [seasonRaces, setSeasonRaces] = useContext(SeasonContext);
  // const [currentRace, setCurrentRace] = useContext(CurrentRaceContext);
  // const [races, setRaces] = useState([])

  const races = seasonRaces.map(race => {
    return race.description;
  })

  return (
    <div className='race-search'>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300 }}
        options={races}
        autoHighlight
        // onChange={setCurrentRace("asdf")}
        // getOptionLabel={(option) => option.label}
        // renderOption={(props, option) => (
        //   <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        //     <img
        //       loading="lazy"
        //       width="20"
        //       // src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
        //       // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
        //       alt=""
        //     />
        //     {option.label}
        //   </Box>
        // )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a race"
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