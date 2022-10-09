import React, { useEffect, useState } from 'react';
import '../App.css';
import Skiresortcard from './Skiresortcard';

function Home({apiData,skiData,lat,long}) {


  return (
    <div className="Home">
        <h1 className='text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Ski-Tracker</h1>
        <h3 className='text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>My current postion. Latitude: {lat} Longitude: {long} </h3>
        <div className='skiresortcontainer grid grid-cols-4'>
          <Skiresortcard resort={skiData[0]} temp={apiData[1]} description={apiData[0]} snow={apiData[2]}/>
          <Skiresortcard resort={skiData[1]} temp={apiData[4]} description={apiData[3]} snow={apiData[5]}/>
          <Skiresortcard resort={skiData[2]} temp={apiData[7]} description={apiData[6]} snow={apiData[8]}/>
          <Skiresortcard resort={skiData[3]} temp={apiData[10]} description={apiData[9]} snow={apiData[11]}/>

          </div>
    </div>
  );
}
export default Home
