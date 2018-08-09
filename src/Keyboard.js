import React, { Component } from 'react';
import Button from './Button';

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

class Keyboard extends Component {

    render() {
        const lettersButtons = [];

        letters.map((letter, index) => {
           lettersButtons.push(<Button letter={letter} key={index} chooseLetter={this.props.chooseLetter} status={this.props.getStatus(letter)}/>);
        });

        return (
            <div className={"keyboard w3-center"}>
                {lettersButtons}
            </div>
        );
    }
}

export default Keyboard;