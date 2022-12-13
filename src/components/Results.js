import React, { useContext, useEffect, useState } from "react";
import { BetDriverContext } from "../contexts/BetDriverContext";
import { CurrentRaceContext } from "../contexts/CurrentRaceContext";
import { ResultsContext } from "../contexts/ResultsContext";
import { SeasonContext } from "../contexts/SeasonContext";


export default function Results() {
  const [seasonRaces] = useContext(SeasonContext);
  const [race] = useContext(CurrentRaceContext);
  const [results, setResults] = useContext(ResultsContext);
  const [betDriver] = useContext(BetDriverContext);


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
        <p>{data.name}</p>
        <div>
          <p>Finished: {data.result.position}</p>
          <p>Started: {data.result.grid}</p>
        </div>
      </div>

    )
  })

  return (
    <>
      <p>Race Results</p>
      <div className="grid-container">
        {resultsList}
      </div>
    </>
  )
}