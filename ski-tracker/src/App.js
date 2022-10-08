
import Home from './components/Home';
import Footer from './components/Footer';
import React, {useState, useEffect} from 'react';
function App() {
  const [state,setState] = useState({})
  const fetchWeatherFromBackend = () =>{
    fetch("http://127.0.0.1:5000/?lat=45.3736&lon=121.6960").then(response => {
    return response.json()
    }).then(data=>console.log(data))
    .then(error => console.log(error))
  }

  useEffect(() => {
    fetchWeatherFromBackend()
  },[])
  return (
    <div className="App">
      <Home apiData={state}></Home>
      <Footer></Footer>
    </div>

  );
}

export default App;
