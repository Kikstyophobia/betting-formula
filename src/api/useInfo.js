import { useState, useEffect } from "react";
import axios from "axios";


const useInfo = () => {

  // const getRaceInfo = async () => {
  //   const raceInfo = await axios.get(`/api/686938`);
  //   return raceInfo;
  // }

  const getSeasonRaces = async () => {
    const seasonRaces = await axios.get(`/api/season/686252`);
    return seasonRaces;
  }

  return {
    // getRaceInfo,
    getSeasonRaces
  }

}

export default useInfo;