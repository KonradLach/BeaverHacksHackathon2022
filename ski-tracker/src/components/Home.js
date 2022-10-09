import React, { useEffect, useState } from 'react';
import '../App.css';
import Skiresortcard from './Skiresortcard';

function Home({apiData,skiData,lat,long}) {
    const [howBusy,setHowBusy] = useState([])
   const getPeopleFromBackend = () => {

    fetch("http://127.0.0.1:5000/count")
        .then(response => response.json())
        .then(data => {
        setHowBusy(data)
        //after recieving the closest four it gets the info from the skimap website
        })
        ;}
    useEffect(() => {
        getPeopleFromBackend()
    },[])

  return (
    <div className="Home">
        <h1 className='text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Ski-Tracker</h1>
        <h3 className='text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>My current postion. Latitude: {lat} Longitude: {long} </h3>
        <div className='skiresortcontainer grid grid-cols-4 justify-center'>
          <Skiresortcard resort={skiData[0]} temp={apiData[1]} description={apiData[0]} snow={apiData[2]} busy = {howBusy[0]} src = {'https://images.unsplash.com/photo-1600332303625-c7d287a9f4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'}/>
          <Skiresortcard resort={skiData[1]} temp={apiData[4]} description={apiData[3]} snow={apiData[5]} busy = {howBusy[1]} src = {'https://images.unsplash.com/photo-1515767513519-e50caaf922e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'}/>
          <Skiresortcard resort={skiData[2]} temp={apiData[7]} description={apiData[6]} snow={apiData[8]} busy = {howBusy[2]} src = {"https://images.unsplash.com/photo-1610394295702-00b39272459d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNraSUyMHJlc29ydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"}/>
          <Skiresortcard resort={skiData[3]} temp={apiData[10]} description={apiData[9]} snow={apiData[11]} busy = {howBusy[3]} src = {'https://images.unsplash.com/photo-1610906592995-1852b86452b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNraSUyMHJlc29ydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'}/>

          </div>
    </div>
  );
}
export default Home
