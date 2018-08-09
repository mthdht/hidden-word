import React, { Component } from 'react';
import Keyboard from './Keyboard';
import words from './words';

class Board extends Component {
    constructor(props) {
        super(props);
        const word = this.pickWord("facile");
        this.state = {
            word: word,
            hiddenWord: "-".repeat(word.length),
            wrongLetter: [],
            goodLetter: [],
            errors: 0,
            difficulty: "facile"
        };

        this.chooseLetter = this.chooseLetter.bind(this);
        this.getStatus = this.getStatus.bind(this);
        this.restart = this.restart.bind(this);
        this.changeLevel = this.changeLevel.bind(this);
    }

    pickWord(difficulty) {
        const number = Math.floor(Math.random() * words[difficulty].length);
        return words[difficulty][number].toUpperCase();
    }

    chooseLetter(letter) {
        const {word, hiddenWord, goodLetter, wrongLetter } = this.state;
        if (goodLetter.includes(letter) || wrongLetter.includes(letter)) {
            return;
        }

        if (word.includes(letter)) {
            goodLetter.push(letter);
            const re = new RegExp(letter, "g");
            let array = hiddenWord.split('');
            word.replace(re, function (match, index) {
                array[index] = letter;
            });
            this.setState({
                hiddenWord: array.join(''),
                goodLetter
            });
            setTimeout(() => {
                if (this.state.hiddenWord === this.state.word) {
                    alert("you win ! Your score is " + ((26 - this.state.errors) * word.length));

                    // this use my portfolio api: see matthieu-dehondt.fr

                    /*axios.post('/jeu/hidden-word/add', {
                        score: (26 - this.state.errors) * word.length,
                        errors: this.state.errors,
                        difficulty: "facile"
                    }).then(function (response) {
                        return (response.data);
                    }).catch(function (error) {
                        console.log(error);
                    });*/
                }
            }, 500);
        } else {
            wrongLetter.push(letter);
            this.setState((prevState) => ({
                wrongLetter,
                errors: prevState.errors + 1
            }));
        }
    }

    getStatus(letter) {
        if (this.state.goodLetter.includes(letter)) {
            return "green";
        }

        if (this.state.wrongLetter.includes(letter)) {
            return "orange";
        }

        return "blue";
    }

    restart() {
        const word = this.pickWord(this.state.difficulty);
        this.setState({
            word: word,
            hiddenWord: "-".repeat(word.length),
            wrongLetter: [],
            goodLetter: [],
            errors: 0
        });
    }

    changeLevel() {
        const currentLevel = this.state.difficulty;
        const level = currentLevel === "facile" ? "moyen" : currentLevel === "moyen" ? "difficile" : currentLevel === "difficile" ? "expert" : "facile";
        this.setState({
            difficulty: level
        });
        setTimeout(() => this.restart(), 500);
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    };

    render() {
        const { hiddenWord, wrongLetter, goodLetter, errors, difficulty} = this.state;
        return (
            <div className={"board w3-container"}>
                <div className="controls w3-center w3-margin-bottom">
                    <button className="level w3-button w3-round-xxlarge ct-dark-blue ct-hover-blue w3-margin w3-large" onClick={this.changeLevel}><b>{difficulty}</b></button>
                    <button className="w3-button w3-round-xxlarge ct-red ct-hover-pink w3-margin w3-large" onClick={this.restart}><b>Restart</b></button>
                </div>
                <div className="main">
                    <div className="attempt-number w3-col m6 l5 w3-padding-12">
                        <p><b>{errors} Erreur{errors > 1 ? 's' : null }</b></p>
                        <div className="indication">
                            <p><span className="good w3-green w3-round"></span> Bonne lettre</p>
                            <p><span className="bad w3-orange w3-round"></span> Mauvaise lettre</p>
                        </div>
                    </div>
                    <div className="attempt-keyboard w3-col m6 l7 w3-padding-12">
                        <div className="word w3-margin-bottom w3-center">
                            <p>{ hiddenWord }</p>
                            <span className={"w3-margin"}>{hiddenWord.length} lettres</span>
                        </div>

                        <Keyboard wrongLetter={wrongLetter} goodLetter={goodLetter} chooseLetter={this.chooseLetter} getStatus={this.getStatus}/>

                    </div>
                </div>

            </div>
        )
    }
}

export default Board;