import React, { useContext, useEffect, useState } from "react";
import { CurrentRaceContext } from "../contexts/CurrentRaceContext";
import { SeasonContext } from "../contexts/SeasonContext";


export default function Results() {
  const [seasonRaces] = useContext(SeasonContext);
  const [race] = useContext(CurrentRaceContext);
  const [results, setResults] = useState([]);


  useEffect(() => {
    seasonRaces.forEach(doc => {
      if (race === doc.description) {
        setResults(doc.results);
      }
      // doc.map(data => {
      //   console.log(data.results)
      // })
    })
  }, [seasonRaces])

  useEffect(() => {
    console.log(results)
  }, [results])

  const resultsList = results.map(data => {

    return (
      <div className="odds-item" key={data.name}>
        <p>{data.name}</p>
        <div>
          <p>Started: {data.result.grid}</p>
          <p>Finished: {data.result.position}</p>
        </div>
      </div>

    )
  })

  return (
    <>
      <p>results</p>
      <div className="grid-container">
        {resultsList}
      </div>
    </>
  )
}