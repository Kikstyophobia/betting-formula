import React, { useContext, useEffect, useState } from "react";
import { BetDriverContext } from "../contexts/BetDriverContext";
import { CurrentRaceContext } from "../contexts/CurrentRaceContext";
import { ResultsContext } from "../contexts/ResultsContext";
import { SeasonContext } from "../contexts/SeasonContext";
import { BetContext } from "../contexts/BetContext";
import { BalanceContext } from "../contexts/BalanceContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { WinAmountContext } from "../contexts/WinAmountContext";

export default function Results() {
  const [seasonRaces] = useContext(SeasonContext);
  const [race] = useContext(CurrentRaceContext);
  const [results, setResults] = useContext(ResultsContext);
  const [betDriver] = useContext(BetDriverContext);
  const [bet] = useContext(BetContext);
  const [balance] = useContext(BalanceContext);
  const [winAmount] = useContext(WinAmountContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    seasonRaces.forEach(doc => {
      if (race === doc.description) {
        setResults(doc.results);
      }
    })
  }, [seasonRaces])

  useEffect(() => {
    let info = [];
    results.map((data) => {
      if (data.result.status !== "Finished") {
        info.push({ driver: data.name, finished: "DNF", started: data.result.grid, time: "DNF" })
      } else if (data.result.time === "1l") {
        info.push({ driver: data.name, finished: data.result.position, started: data.result.grid, time: "+1 lap" })
      } else {
        info.push({ driver: data.name, finished: data.result.position, started: data.result.grid, time: data.result.time })
      }
    })
    setRows(info);
  }, [results])

  const betDriverResult = results.map(data => {
    if (data.name === betDriver.name) {
      return data.result.position;
    }
  })

  useEffect(() => {
    console.log("betdriverresult", betDriverResult);
  }, [betDriverResult])

  const columns = [
    {
      id: 'driver',
      label: 'Driver', minWidth: 100,
      align: 'left',
    },
    {
      id: 'finished',
      label: 'Finished',
      align: 'center',
      minWidth: 100,
      maxWidth: 100
    },
    {
      id: 'started',
      label: 'Started',
      minWidth: 100,
      align: 'center'
    },
    {
      id: 'time',
      label: 'Time',
      minWidth: 100,
      align: 'center'
    }
  ];

  return (
    <>
      <p><strong>Bet Results</strong></p>
      <div className="bet-summary">

        <table className="table">
          <thead>
            <tr>
              <th scope="col"><u>Driver Selected</u></th>
              <th scope="col"><u>Driver Result</u></th>
              <th scope="col"><u>Bet Amount</u></th>
              {betDriverResult[0] === 1 && <th scope="col"><u>Amount Won</u></th>}
              <th scope="col"><u>New Balance</u></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{betDriver.name}</td>
              <td>Position: {betDriverResult}</td>
              <td>{bet}</td>
              {betDriverResult[0] === 1 && <td>${winAmount}</td>}
              <td>${balance}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Race Results</strong></p>
      <div className="results-box">

        <TableContainer sx={{ maxHeight: 340 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
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
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </>
  )
}