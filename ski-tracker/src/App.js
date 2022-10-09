import Home from './components/Home';
import Footer from './components/Footer';
import React, {useState, useEffect} from 'react';
function App() {
  const [state,setState] = useState({})
  const [skiData,setSkiData] = useState([])
  const [skiDataLoading,setSkiDataLoading] = useState(true)
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [islocationLoading,setIsLocationLoading] = useState(true)

  //Sends current user location to backend and then recieves closest four resorts
  const getClosestResorts = (latitude,longitude) => {
     const requestOptionsClosest = {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({latitude:lat,longitude:long})
    };
    fetch("http://127.0.0.1:5000/four", requestOptionsClosest)
        .then(response => response.json())
        .then(data => {
        console.log(data)
        //after recieving the closest four it gets the info from the skimap website
        getResortFromApiAsync(data)
        })
        ;}

    //gets user location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setIsLocationLoading(false)
        })


        console.log("Latitude is:", {lat})
        console.log("Longitude is:", {long})
      }, []);

    useEffect(()=> {
//gets closest resorts after location is done loading
            getClosestResorts(lat,long)

    },[islocationLoading])


   //makes resorts for skimap api then sends resort info to backend to get weather
  function getResortFromApiAsync(id) {


    const promises = []
    for(let i = 0; i<id.length;i++){

      promises.push(fetch(`https://skimap.org/SkiAreas/view/${parseInt(id[i])}.json`))
    }
    Promise.all(promises)
      .then(([res1,res2,res3,res4])=>Promise.all([res1.json(),res2.json(),res3.json(),res4.json()]))
      .then(([data1,data2,data3,data4]) => {
        setSkiData([...skiData,{name:data1.name, latitude:data1.latitude,longitude:data1.longitude, website:data1.official_website},{name:data2.name, latitude:data2.latitude,longitude:data2.longitude, website:data2.official_website},{name:data3.name, latitude:data3.latitude,longitude:data3.longitude, website:data3.official_website},{name:data4.name, latitude:data4.latitude,longitude:data4.longitude, website:data4.official_website}])
            const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({ resort1:[data1.latitude,data1.longitude], resort2: [data2.latitude,data2.longitude],resort3: [data3.latitude,data3.longitude],resort4: [data4.latitude,data4.longitude] })
//        body: JSON.stringify({resort1:[11,44],resort2:[12,45],resort3:[13,43],resort4:[11,43]})
    };
    fetch("http://127.0.0.1:5000/data", requestOptions)
        .then(response => response.json())
        .then(data => setState(data))
        setSkiDataLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
   }



  if(skiDataLoading){
    return <div className='App'>Loading..</div>
  }

  return (
    <div className="App">
      <Home apiData={state} skiData={skiData} lat={lat} long={long}></Home>
      <Footer></Footer>
    </div>

  );
}

export default App;