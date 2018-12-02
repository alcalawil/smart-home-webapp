import React, { Component } from "react";
import { Button } from "@material-ui/core";
import axios from 'axios';

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            username: ''
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
        
        axios.post('http://localhost:5000/set-led', { value: this.state.isToggleOn ? 1 : 0 })
            .then(response => console.log(response));

    }

    render() {
        return (
            <Button variant="contained" color="primary" onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </Button>
        );
    }
}

export default Toggle;