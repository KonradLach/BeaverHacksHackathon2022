import React, { useEffect, useState } from 'react';
import '../App.css';


function Home() {

    const [data,setData] = useState([])
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    //fetches ski resort data from skimap.org
    function getResortFromApiAsync(id) {
        return fetch(`https://skimap.org/SkiAreas/view/160.json`)
        .then((response) => response.json())
        .then((responseJson) => {
            setData(responseJson)
          return responseJson.resort;
        })
        .catch((error) => {
          console.error(error);
        });
     }



     useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
    
        console.log("Latitude is:", lat)
        console.log("Longitude is:", long)
      }, [lat, long]);

      useEffect(() => {
        getResortFromApiAsync()
    },[])


    console.log(data)
  return (
    <div className="Home">
        <h1>Ski-Tracker</h1>
        <div><h2>{data.name}</h2>
        <h3>Latitude: {data.latitude} Longitude: {data.longitude}  </h3></div>
        <h3>My current postion. Latitude: {lat} Longitude: {long} </h3>
    </div>
  );
}

export default Home
