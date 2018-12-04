import React, { Component } from 'react'
import './App.css'
import Toggle from "./Toggle";
import logo from "./img/smart-home.png"

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Smart Home</h2> 
          <Toggle />
        </div>
      </div>
    )
  }
}

export default App