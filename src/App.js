import React, { Component } from 'react'
import './App.css'
import Grid from '@material-ui/core/Grid';
import Toggle from "./components/Toggle";
import logo from "./img/smart-home.png"
import Configuration from './components/Configuration';
import Temperature from './components/Temperature';
import mqttClient from './mqtt';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      username: '',
      urlApi: '',
      mqtt: new mqttClient()
    };
  }

  componentDidMount() {
    this.state.mqtt.connect().then(() => {
      console.log('conectado');
    }).catch((err) => {
      console.log(err);
    });
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div className='App'>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Smart Home</h2>
          <Grid container 
            spacing={0} 
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={4}>
              <Configuration
                state={this.state}
                handleChange={this.handleChange} />
            </Grid>
            <Grid item xs={4}>
              <Toggle
                state={this.state} />
            </Grid>
            <Grid item xs={4}>
              <Temperature
                state={this.state}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default App