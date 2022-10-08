
import Home from './components/Home';
import Footer from './components/Footer';
import React, {useState, useEffect} from 'react';
function App() {
  const [state,setState] = useState({})
  const fetchWeatherFromBackend = () =>{
    fetch("/api").then(response => {
      if(response.status === 300){
        return response.json()
      }
    }).then(data=>setState(data))
    .then(error => console.log(error))
  }

  useEffect(() => {
    fetchWeatherFromBackend()
  },[])
  return (
    <div className="App">
      <Home apiData={data}></Home>
      <Footer></Footer>
    </div>

  );
}

export default App;
