import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.chooseLetter(this.props.letter);
    }

    render() {


        return (
            <button className={"w3-button w3-round w3-" + this.props.status}  onClick={this.handleClick}>
                <b>{ this.props.letter }</b>
            </button>
        );
    }
}

export default Button;