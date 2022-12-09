import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <CircularProgress sx={{color: red[800]}}/>
    </Box>
  );
}
