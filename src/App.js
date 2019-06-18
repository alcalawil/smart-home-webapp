import React, { Component } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Toggle from "./components/Toggle";
import logo from "./img/smart-home.png";
import Configuration from "./components/Configuration";
import Temperature from "./components/Temperature";
import MqttService from "./services/MqttService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      username: '',
      urlApi: '',
      mqtt: new MqttService(),
      key: null,
      cert: null,
      ca: null,
      clientId: '',
      host: ''
    };
  }

  componentDidMount() {}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeCredentials = name => event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      var buffer = Buffer.from(reader.result);
      this.setState({
        [name]: buffer
      });
    };
    reader.readAsDataURL(file);
  };

  handleConnect = () => {
    const {key, cert, ca, clientId, host} = this.state;
    this.state.mqtt
      .connect(key,cert,ca,clientId,host)
      .then(() => {
        console.log("connected");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Smart Home</h2>
          <Grid
            container
            spacing={0}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Configuration
                state={this.state}
                handleChange={this.handleChange}
                handleChangeCredentials={this.handleChangeCredentials}
                handleConnect={this.handleConnect}
              />
            </Grid>
            <Grid item xs={4}>
              <Toggle state={this.state} />
            </Grid>
            <Grid item xs={4}>
              <Temperature state={this.state} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
