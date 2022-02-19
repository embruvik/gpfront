import logo from './logo.svg';
import './App.css';
import 'axios';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [message, setMessage]  = useState("No message yet!");

  const sendToUser = (e) => {
    e.preventDefault();
    axios.get("http://localhost:8080/user/erik")
    .then(resp => {
      console.log(resp);
      setMessage(resp.data.message);
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
    </div>
  );
}

export default App;
