import React from "react";
import axios from "axios";


const getInfo = () => {

  const getRaceInfo = async () => {

    // return a promise (just the data) and set the state inside App instead.

    const raceInfo = await axios.get(`/api/686938`);
    return raceInfo;
  }

  const getSeasonRaces = async () => {
    // const seasonRaces = `/api/season/686252`;
  }

  return {
    getRaceInfo,
    getSeasonRaces
  }

}

export default getInfo;