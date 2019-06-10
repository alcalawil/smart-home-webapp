import React, { Component } from "react";
import { Fab, Popper, Typography, Fade, Paper, Badge } from "@material-ui/core";
import { WbIncandescent } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
  paper: {
    padding: 8,
    width: 220,
    heigth: 250
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      temperature: 36,
      scale: 'celsius'
    };
  }

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  handleChange = event => {
    this.setState({ scale: event.target.value });
  };

  convertToFahrenheit = (celsius) => {
    var result = 0; 
    result = (celsius * 1.8) + 32;
    return result;
  }
  convertToKelvin = (celsius) => {
    var result = 0; 
    result = celsius + 273.15;
    return result;
  }
  render() {
    const { classes } = this.props;
    const { anchorEl, open, temperature, scale } = this.state;
    const id = open ? 'temperature-popper' : null;
    return (
      <div>
        <Badge className={classes.margin} badgeContent={`${temperature}°C`} color="primary">
          <Fab color="primary" aria-label="Add" className={classes.fab}
            onClick={this.handleClick} size="small">
            <WbIncandescent />
          </Fab>
        </Badge>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.paper}>
                <Typography className={classes.typography}>Selecciona la escala de temperatura de tu preferencia.</Typography>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Escalas</FormLabel>
                  <RadioGroup
                    aria-label="Scale"
                    name="scale"
                    className={classes.group}
                    value={scale}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="celsius" control={<Radio color="primary" />} label="Celsius" />
                    <FormControlLabel value="fahrenheit" control={<Radio color="primary" />} label="Fahrenheit" />
                    <FormControlLabel value="kelvin" control={<Radio color="primary" />} label="Kelvin" />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

export default withStyles(useStyles)(Temperature);