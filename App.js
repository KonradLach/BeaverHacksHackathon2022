import Home from './components/Home';
import Footer from './components/Footer';
import React, {useState, useEffect} from 'react';
function App() {
  const [state,setState] = useState({})
  const [skiData,setSkiData] = useState([])
  let id = [160,165,162,175]
  const [skiDataLoading,setSkiDataLoading] = useState(true)

  function getResortFromApiAsync(id) {
    const promises = []
    for(let i = 0; i<id.length;i++){
      promises.push(fetch(`https://skimap.org/SkiAreas/view/${id[i]}.json`))
    }
    Promise.all(promises)
      .then(([res1,res2,res3,res4])=>Promise.all([res1.json(),res2.json(),res3.json(),res4.json()]))
      .then(([data1,data2,data3,data4]) => {
        setSkiData([...skiData,{name:data1.name, latitude:data1.latitude,longitude:data1.longitude},{name:data2.name, latitude:data2.latitude,longitude:data2.longitude},{name:data3.name, latitude:data3.latitude,longitude:data3.longitude},{name:data4.name, latitude:data4.latitude,longitude:data4.longitude}])
            const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({ resort1:[data1.latitude,data1.longitude], resort2: [data2.latitude,data2.longitude],resort3: [data3.latitude,data3.longitude],resort4: [data4.latitude,data4.longitude] })
//        body: JSON.stringify({resort1:[11,44],resort2:[12,45],resort3:[13,43],resort4:[11,43]})
    };
    fetch("http://127.0.0.1:5000/data", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
        setSkiDataLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
   }

   useEffect(() => {
    getResortFromApiAsync(id)

    },[])



  if(skiDataLoading){
    return <div className='App'>Loading..</div>
  }

  return (
    <div className="App">
      <Home apiData={state} skiData={skiData}></Home>
      <Footer></Footer>
    </div>

  );
}

export default App;