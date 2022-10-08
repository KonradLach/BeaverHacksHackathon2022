import React, { useEffect, useState } from 'react';
import '../App.css';
import Skiresortcard from './Skiresortcard';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

function Home({apiData}) {

    const [skiData,setSkiData] = useState([])
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [skiDataLoading,setSkiDataLoading] = useState(true)
    //fetches ski resort data from skimap.org
    let id = [160,165,162,175]

    function getResortFromApiAsync(id) {
      const promises = []
      for(let i = 0; i<id.length;i++){
        promises.push(fetch(`https://skimap.org/SkiAreas/view/${id[i]}.json`))
      }
      Promise.all(promises)
        .then(([res1,res2,res3,res4])=>Promise.all([res1.json(),res2.json(),res3.json(),res4.json()])) 
        .then(([data1,data2,data3,data4]) => {
          console.log(data1)
          setSkiData([...skiData,{name:data1.name, latitude:data1.latitude,longitude:data1.longitude},{name:data2.name, latitude:data2.latitude,longitude:data2.longitude},{name:data3.name, latitude:data3.latitude,longitude:data3.longitude},{name:data4.name, latitude:data4.latitude,longitude:data4.longitude}])
          setSkiDataLoading(false)
        })
        .catch((error) => {
          console.error(error);
        });
     }

    const { data, isLoading, errorMessage } = useOpenWeather({
      // key: '66d7fecb1ff378f6d549b766038d5ff3',
      key: 'off while testing',
      lat: "44.43355",
      lon: "-89.39851",
      lang: 'en',
      unit: 'imperial', // values are (metric, standard, imperial)
    });
    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });

        console.log("Latitude is:", {lat})
        console.log("Longitude is:", {long})
      }, []);



      useEffect(() => {
          getResortFromApiAsync(id)
      },[])
  
      const renderResortCards = () => {
        const cards = skiData.map((resort) =>
        <Skiresortcard resort = {resort} key={resort.name}/>)
        return(
          <div className='skiresortcontainer grid grid-cols-4'>
            {cards}
          </div>)
      }

  if(skiDataLoading){
    return <div className='App'>Loading..</div>
  }

  return (
    <div className="Home">
        <h1 className='text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Ski-Tracker</h1>
        <h3 className='text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>My current postion. Latitude: {lat} Longitude: {long} </h3>
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel={skiData.name}
          unitsLabels={{ temperature: 'F', windSpeed: 'mph' }}
          showForecast
        />
          {renderResortCards()}
          {apiData.main.temp}
    </div>
  );
}
export default Home
