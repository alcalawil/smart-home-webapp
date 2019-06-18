import React, { Component } from "react";
import {
    Fab, Popper, Fade, Paper, TextField, Typography,
    FormControl, Input, InputLabel, Button
} from "@material-ui/core";
import classNames from 'classnames';
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
        const { urlApi, clientId, host } = this.props.state;
        const { handleChange, classes, handleChangeCredentials,
            handleConnect } = this.props;
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
                                <Typography variant="subtitle1" gutterBottom>
                                    Asignar ID.
                                </Typography>
                                <TextField
                                    id="clientId"
                                    className={classes.textField}
                                    value={clientId}
                                    onChange={handleChange('clientId')}
                                    margin="normal"
                                />
                                <Typography variant="subtitle1" gutterBottom>
                                    Asignar host.
                                </Typography>
                                <TextField
                                    id="host"
                                    className={classes.textField}
                                    value={host}
                                    onChange={handleChange('host')}
                                    margin="normal"
                                />
                                <FormControl
                                    className={classNames(classes.margin, classes.textField)}
                                >
                                    <InputLabel htmlFor="key">
                                        Cargar Key
                                    </InputLabel>
                                    <Input
                                        accept=".key"
                                        id="key"
                                        multiple
                                        type="file"
                                        onChange={handleChangeCredentials('key')}
                                    />
                                </FormControl>
                                <FormControl
                                    className={classNames(classes.margin, classes.textField)}
                                >
                                    <InputLabel htmlFor="cert">
                                        Cargar Certificado
                                    </InputLabel>
                                    <Input
                                        accept=".crt"
                                        id="cert"
                                        multiple
                                        type="file"
                                        onChange={handleChangeCredentials('cert')}
                                    />
                                </FormControl>
                                <FormControl
                                    className={classNames(classes.margin, classes.textField)}
                                >
                                    <InputLabel htmlFor="ca">
                                        Cargar CA
                                    </InputLabel>
                                    <Input
                                        accept=".pem"
                                        id="ca"
                                        multiple
                                        type="file"
                                        onChange={handleChangeCredentials('ca')}
                                    />
                                </FormControl>
                                <Button color="primary" variant="contained" onClick={handleConnect}>
                                    Conectar
                                </Button>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}

export default withStyles(useStyles)(Configuration);