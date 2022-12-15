import React, { useContext, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BetDriverContext } from "../contexts/BetDriverContext";
import { CurrentRaceContext } from "../contexts/CurrentRaceContext";
import { ResultsContext } from "../contexts/ResultsContext";
import { SeasonContext } from "../contexts/SeasonContext";
import { BetContext } from "../contexts/BetContext";
import { BalanceContext } from "../contexts/BalanceContext";

export default function Results() {
  const [seasonRaces] = useContext(SeasonContext);
  const [race] = useContext(CurrentRaceContext);
  const [results, setResults] = useContext(ResultsContext);
  const [betDriver] = useContext(BetDriverContext);
  const [bet] = useContext(BetContext);
  const [balance] = useContext(BalanceContext);

  useEffect(() => {
    seasonRaces.forEach(doc => {
      if (race === doc.description) {
        setResults(doc.results);
      }
    })
  }, [seasonRaces])

  const resultsList = results.map(data => {

    return (
      <div className="odds-item" key={data.name}>
        <p><strong>{data.name}</strong></p>
        <div>
          <p>Finished: {data.result.position}</p>
          <p>Started: {data.result.grid}</p>
        </div>
      </div>
    )

  })

  const betDriverResult = results.map(data => {
    if (data.name === betDriver.name) {
      return data.result.position;
    }
  })


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
              <th scope="col"><u>New Balance</u></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{betDriver.name}</td>
              <td>Position: {betDriverResult}</td>
              <td>{bet}</td>
              <td>${balance}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Race Results</strong></p>
      <div className="grid-container">
        {resultsList}
      </div>
    </>
  )
}