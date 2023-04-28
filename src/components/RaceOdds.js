import { React, useContext, useEffect, useState } from 'react';
import { CurrentRaceContext } from '../contexts/CurrentRaceContext';
import { ProbabilitiesContext } from '../contexts/ProbablilitiesContext';
import { SeasonContext } from '../contexts/SeasonContext';
import { ResultsContext } from '../contexts/ResultsContext';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function RaceOdds() {
  const [probabilities, setProbabilities] = useContext(ProbabilitiesContext);
  const race = useContext(CurrentRaceContext);
  const [seasonRaces] = useContext(SeasonContext);
  const [cancelled, setCancelled] = useState(false);
  const [results] = useContext(ResultsContext);
  const [rows, setRows] = useState([]);


  useEffect(() => {
    let info = [];

    probabilities.map((value) => {
      for (let i = 0; i < results.length; i++) {

        if (results[i].name === value.name) {
          let odds = value.probability;
          let convertedOdds = "";

          if (odds > 50) {
            convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
          } else if (odds < 50) {
            convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
          } else {
            convertedOdds = 0;
          }

          info.push({ name: value.name, team: results[i].team.name, probability: convertedOdds });
        }
      }
    })
    setRows(info);
  }, [probabilities])


  useEffect(() => {
    seasonRaces.forEach(doc => {
      if (race[0] === doc.description) {
        if (doc.probabilities === null) {
          setCancelled(true);
        } else {
          setCancelled(false);
          setProbabilities(doc.probabilities);
        }
      }
    })
  }, [race]);

  useEffect(() => {

  })

  const columns = [
    {
      id: 'name',
      label: 'Driver',
      minWidth: 100,
      maxWidth: 200,
      align: 'center',
    },
    {
      id: 'team',
      label: 'Team',
      minWidth: 100,
      maxWidth: 200,
      align: 'center',
    },
    {
      id: 'probability',
      label: 'Odds',
      minWidth: 100,
      maxWidth: 200,
      align: 'center'
    }
  ];


  return (
    <>
      {!cancelled ?
        <div className='results-box'>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                      sx={{ fontWeight: 'bold' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* {displayOdds} */}
        </div>
        : <p className='message'>Race cancelled, no information available.</p>}
    </>
  )
}