import React, { useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BetDriverContext } from "../contexts/BetDriverContext";
import { CurrentRaceContext } from "../contexts/CurrentRaceContext";
import { ResultsContext } from "../contexts/ResultsContext";
import { SeasonContext } from "../contexts/SeasonContext";
import { BetContext } from "../contexts/BetContext";
import { BalanceContext } from "../contexts/BalanceContext";
import { WinAmountContext } from "../contexts/WinAmountContext";
import { RenderResultsContext } from "../contexts/RenderResultsContext";
import { DriverContext } from "../contexts/DriverContext";
import { ProbabilitiesContext } from "../contexts/ProbablilitiesContext";


export default function Results() {
  const [seasonRaces] = useContext(SeasonContext);
  const [race] = useContext(CurrentRaceContext);
  const [results, setResults] = useContext(ResultsContext);
  const [driver] = useContext(DriverContext)
  const [betDriver] = useContext(BetDriverContext);
  const [bet] = useContext(BetContext);
  const [balance] = useContext(BalanceContext);
  const [winAmount] = useContext(WinAmountContext);
  const [rows, setRows] = useState([]);
  const [render] = useContext(RenderResultsContext);
  const [probabilities] = useContext(ProbabilitiesContext);


  useEffect(() => {
    let info = [];
    results.map((data) => {
      if (data.result.status !== "Finished") {
        info.push({ driver: data.name, team: data.team.name, finished: "DNF", started: data.result.grid, time: "DNF" })
      } else if (data.result.time === "1l") {
        info.push({ driver: data.name, team: data.team.name, finished: data.result.position, started: data.result.grid, time: "+1 lap" })
      } else {
        info.push({ driver: data.name, team: data.team.name, finished: data.result.position, started: data.result.grid, time: data.result.time })
      }
    })
    setRows(info);
  }, [results])

  const betDriverResult = results.map(data => {
    if (data.name === betDriver.name) {
      return data.result.position;
    }
  })


  let potentialEarnings;
  const displayDriverOdds = probabilities.map(data => {
    let odds = data.probability;
    let convertedOdds = "";
    if (driver === data.name) {

      if (odds > 50) {
        convertedOdds = (odds / (100 - odds) * -100).toFixed(0);
      } else if (odds < 50) {
        convertedOdds = `+${((100 - odds) / odds * 100).toFixed(0)}`;
      } else {
        convertedOdds = 0;
      }
    }

    if (bet && driver === data.name) {
      let betAmount = Number(bet.slice(1));

      if (odds > 50) {
        potentialEarnings = Math.round(betAmount / Number((odds / (100 - odds) * 100) / 100));
      } else if (odds < 50) {
        potentialEarnings = Math.round(betAmount * Number(((100 - odds) / odds * 100).toFixed() / 100));
      }
    }

    return convertedOdds;
  })

  const columns = [
    {
      id: 'driver',
      label: 'Driver',
      minWidth: 50,
      maxWidth: 200,
      align: 'left',
    },
    {
      id: 'team',
      label: 'Team',
      minWidth: 50,
      maxWidth: 200,
      align: 'left',
    },
    {
      id: 'finished',
      label: 'Finished',
      align: 'center',
      minWidth: 100,
      maxWidth: 200
    },
    {
      id: 'started',
      label: 'Started',
      minWidth: 100,
      maxWidth: 200,
      align: 'center'
    },
    {
      id: 'time',
      label: 'Time',
      minWidth: 100,
      maxWidth: 200,
      align: 'center'
    }
  ];

  return (
    <>
      {!render && bet ? <div>
        <h3><strong>Projected Results</strong></h3>
        <div className="bet-summary projected">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"><u>Driver Selected</u></th>
                <th scope="col"><u>Driver Odds</u></th>
                <th scope="col"><u>Bet Amount</u></th>
                <th scope="col"><u>Potential Earnings</u></th>
                <th scope="col"><u>Final Balance</u></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{driver}</td>
                <td>{displayDriverOdds}</td>
                <td>{bet}</td>
                <td>${potentialEarnings}</td>
                <td>${balance + potentialEarnings}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> : null}

      {render ?
        <>
          <h3> <strong>Bet Results</strong></h3>
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

          <h3><strong>Race Results</strong></h3>
          <div className="results-box">

            <TableContainer sx={{ maxHeight: 340 }}>
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

          </div>
        </> : null}
    </>
  )
}