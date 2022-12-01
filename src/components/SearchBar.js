import { React, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBar(state) {
  const [bet, setBet] = useState();
  const [betInput, setBetInput] = useState();
  const [driver, setDriver] = useState();
  const [driverInput, setDriverInput] = useState();

  const racerList = state.racers.map(data => {
    return (
      data.name
    )
  })

  // console.log(state.racers);

  const betAmounts = ['$20', '$50', '$100', '$250', '$500', '$1000'];
  // const countries = state.races.data.stages.map(array => {
  //   return (
  //     <p>{array.description}</p>
  //   )
  // });

  return (
    <>
      {/* {countries} */}
      <div className='search-area'>

        {/* COUNTRY SELECT */}
        {/* <div className='race-search'>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div> */}

        <div className='bet-box'>
          {/* DRIVER SELECT */}
          <div className='driver-select'>
            <br />
            <Autocomplete
              value={driver}
              onChange={(event, newValue) => {
                setDriver(newValue);
              }}
              inputValue={driverInput}
              onInputChange={(event, newInputValue) => {
                setDriverInput(newInputValue);
              }}
              id="controllable-states-demo"
              options={racerList}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Choose a driver" />}
            />
          </div>

          {/* BET SELECT */}
          <div className='bet-select'>
            <br />
            <Autocomplete
              value={bet}
              onChange={(event, newValue) => {
                setBet(newValue);
              }}
              inputValue={betInput}
              onInputChange={(event, newInputValue) => {
                setBetInput(newInputValue);
              }}
              id="controllable-states-demo"
              options={betAmounts}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Bet Amount" />}
            />
            <button className='bet-button'>Place Bet</button>
          </div>
        </div>
        {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div> */}
        {/* <div>{`inputValue: '${inputValue}'`}</div> */}
      </div>
    </>
  );
}



// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  {
    code: 'AE',
    label: 'Abu Dhabi Grand Prix'
  },
  { code: 'AT', label: 'Austrian Grand Prix' },
  { code: 'AT', label: 'Styrian Grand Prix' },
  {
    code: 'AU',
    label: 'Australian Grand Prix',
    suggested: true,
  },
  { code: 'AZ', label: 'Azerbaijan Grand Prix' },
  { code: 'BE', label: 'Belgian Grand Prix' },
  { code: 'BH', label: 'Bahrain Grand Prix' },
  { code: 'BR', label: 'Brazilian Grand Prix' },
  {
    code: 'CA',
    label: 'Canada',
  },
  { code: 'CN', label: 'Chinese Grand Prix' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
  },
  { code: 'ES', label: 'Spanish Grand Prix' },
  {
    code: 'FR',
    label: 'French',
  },
  { code: 'GB', label: 'British Grand Prix' },
  { code: 'HU', label: 'Hungarian Grand Prix' },
  { code: 'IT', label: 'Italian Grand Prix' },
  { code: 'IT', label: 'Emilia Romagna Grand Prix' },
  {
    code: 'JP',
    label: 'Japanese Grand Prix',
  },
  { code: 'MC', label: 'Monaco Grand Prix' },
  { code: 'MX', label: 'Mexican Grand Prix' },
  { code: 'NL', label: 'Dutch Grand Prix' },
  { code: 'PT', label: 'Portuguese Grand Prix' },
  { code: 'QA', label: 'Qatar Grand Prix' },

  { code: 'RU', label: 'Russian Grand Prix' },
  { code: 'SA', label: 'Saudi Arabian Grand Prix' },

  { code: 'SG', label: 'Singapore Grand Prix' },
  { code: 'TR', label: 'Turkish Grand Prix' },
  {
    code: 'US',
    label: 'United States Grand Prix',
  }
]