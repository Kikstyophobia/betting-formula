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
            {option.label} Grand Prix
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
    label: 'Abu Dhabi'
  },
  // { code: 'AT', label: 'Austrian'},
  // { code: 'AT', label: 'Styrian'},
  // {
  //   code: 'AU',
  //   label: 'Australian',
  //   suggested: true,
  // },
  // { code: 'AZ', label: 'Azerbaijan'},
  // { code: 'BE', label: 'Belgian'},
  // { code: 'BH', label: 'Bahrain'},
  // { code: 'BR', label: 'Brazilian'},
  // {
  //   code: 'CA',
  //   label: 'Canada',
  // },
  // { code: 'CN', label: 'Chinese'},
  // {
  //   code: 'DE',
  //   label: 'Germany',
  //   phone: '49',
  // },
  // { code: 'ES', label: 'Spanish'},
  // {
  //   code: 'FR',
  //   label: 'French',
  // },
  // { code: 'GB', label: 'British'},
  // { code: 'HU', label: 'Hungarian'},
  // { code: 'IT', label: 'Italian'},
  // { code: 'IT', label: 'Emilia Romagna'},
  // {
  //   code: 'JP',
  //   label: 'Japanese',
  // },
  // { code: 'MC', label: 'Monaco'},
  // { code: 'MX', label: 'Mexican'},
  // { code: 'NL', label: 'Dutch'},
  // { code: 'PT', label: 'Portuguese'},
  // { code: 'QA', label: 'Qatar'},

  // { code: 'RU', label: 'Russian'},
  // { code: 'SA', label: 'Saudi Arabian'},

  // { code: 'SG', label: 'Singapore'},
  // { code: 'TR', label: 'Turkish'},
  // {
  //   code: 'US',
  //   label: 'United States',
  // }
]