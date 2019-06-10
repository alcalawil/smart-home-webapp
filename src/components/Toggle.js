import React, { Component } from "react";
import { Fab,  Badge } from "@material-ui/core";
import { WbIncandescent } from '@material-ui/icons';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

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
    }
});

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            anchorEl: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = event => {
        const { urlApi } = this.props.state;
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
        axios.post(`${urlApi}set-led`, { value: this.state.isToggleOn })
            .then(response => console.log(response));
    };

    render() {
        const { isToggleOn } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Badge className={classes.margin} badgeContent={isToggleOn ? 'ON' : 'OFF'} color="primary">
                    <Fab color="primary" aria-label="Add" className={classes.fab}
                        onClick={this.handleClick} size="small">
                        <WbIncandescent />
                    </Fab>
                </Badge>
            </div>
        );
    }
}

export default withStyles(useStyles)(Toggle);