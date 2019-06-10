import React, { Component } from "react";
import { Fab, Popper , Fade, Paper, TextField, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { Settings } from '@material-ui/icons';

const useStyles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    paper: {
        padding: 8,
        width: 220,
        heigth: 250
    }
});

class Configuration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: currentTarget,
          open: !state.open,
        }));
    };

    render() {
        const { urlApi } = this.props.state;
        const { handleChange, classes } = this.props;
        const { anchorEl, open } = this.state;
        const id = open ? 'configuration-popper' : null;
        return (
            <div>
                <Fab color="primary" aria-label="Add" className={classes.fab}
                    onClick={this.handleClick} size="small">
                    <Settings />
                </Fab>
                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper className={classes.paper}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Asigna la url de tu servidor.
                                </Typography>
                                <TextField
                                    id="url-api"
                                    className={classes.textField}
                                    value={urlApi}
                                    onChange={handleChange('urlApi')}
                                    margin="normal"
                                />
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}

export default withStyles(useStyles)(Configuration);