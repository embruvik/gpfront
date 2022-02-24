import logo from './logo.svg';
import './App.css';
import 'axios';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [message, setMessage]  = useState("No message yet!");
  const [gotfig, setGotfig] = useState(false);
  const [figdata, setFigdata] = useState('');

  const sendToUser = (e) => {
    e.preventDefault();

    let ml = '';
    (Math.random() < 0.75) ? ml='ml/' : ml='';

    axios.get(`http://localhost:8080/user/${ml}erik`)
    .then(resp => {
      console.log(resp);
      setMessage(resp.data.message);
      if (resp.data.fig) {
        setGotfig(true)
        setFigdata(resp.data.fig)
      } else {
        setGotfig(false)
      }

    })
    .catch(error => {
      setMessage(error.message);
    });
  }

  const sendToInstr = (e) => {
    e.preventDefault();
    axios.get("http://localhost:8080/instr/sg562")
    .then(resp => {
      console.log(resp);
      setMessage(resp.data);
    })
    .catch(error => {
      setMessage(error.message);
    });
  }

  return (
    <div className="App">
      <button onClick={sendToUser}> Send to user</button>
      <button onClick={sendToInstr}> Send to instr</button>
      { message ? <h1>{message}</h1> : <h1>Uhm, hello!</h1> }
      { gotfig ? <img src={figdata}></img> : <h3>No figure in data...</h3>}
    </div>
  );
}

export default App;
