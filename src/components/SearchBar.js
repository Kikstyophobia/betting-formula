import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBar() {


  const options = ['Option 1', 'Option 2'];


  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <>
      <div>
        <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <br />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Controllable" />}
        />
      </div>

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
    </>
  );
}



// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  {
    code: 'AE',
    label: 'Abu Dhabi Grand Prix'
  },
  { code: 'AT', label: 'Austrian Grand Prix'},
  { code: 'AT', label: 'Styrian Grand Prix'},
  {
    code: 'AU',
    label: 'Australian Grand Prix',
    suggested: true,
  },
  { code: 'AZ', label: 'Azerbaijan Grand Prix'},
  { code: 'BE', label: 'Belgian Grand Prix'},
  { code: 'BH', label: 'Bahrain Grand Prix'},
  { code: 'BR', label: 'Brazilian Grand Prix'},
  {
    code: 'CA',
    label: 'Canada',
  },
  { code: 'CN', label: 'Chinese Grand Prix'},
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
  },
  { code: 'ES', label: 'Spanish Grand Prix'},
  {
    code: 'FR',
    label: 'French',
  },
  { code: 'GB', label: 'British Grand Prix'},
  { code: 'HU', label: 'Hungarian Grand Prix'},
  { code: 'IT', label: 'Italian Grand Prix'},
  { code: 'IT', label: 'Emilia Romagna Grand Prix'},
  {
    code: 'JP',
    label: 'Japanese Grand Prix',
  },
  { code: 'MC', label: 'Monaco Grand Prix'},
  { code: 'MX', label: 'Mexican Grand Prix'},
  { code: 'NL', label: 'Dutch Grand Prix'},
  { code: 'PT', label: 'Portuguese Grand Prix'},
  { code: 'QA', label: 'Qatar Grand Prix'},

  { code: 'RU', label: 'Russian Grand Prix'},
  { code: 'SA', label: 'Saudi Arabian Grand Prix'},

  { code: 'SG', label: 'Singapore Grand Prix'},
  { code: 'TR', label: 'Turkish Grand Prix'},
  {
    code: 'US',
    label: 'United States Grand Prix',
  }
]