import React, { useEffect, useState } from 'react';
import '../App.css';
import Skiresortcard from './Skiresortcard';

function Home({apiData,skiData}) {

    // const [skiData,setSkiData] = useState([])
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });

        console.log("Latitude is:", {lat})
        console.log("Longitude is:", {long})
      }, []);




  
      const renderResortCards = () => {
        const cards = skiData.map((resort) =>
        <Skiresortcard resort = {resort} key={resort.name}/>)
        return(
          <div className='skiresortcontainer grid grid-cols-4'>
            {cards}
          </div>)
      }



  return (
    <div className="Home">
        <h1 className='text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Ski-Tracker</h1>
        <h3 className='text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>My current postion. Latitude: {lat} Longitude: {long} </h3>
          {renderResortCards()}
          {/* {apiData.main.temp} */}
    </div>
  );
}
export default Home