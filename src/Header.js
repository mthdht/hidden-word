import React, { Component } from 'react';

class Header extends Component {

    open() {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }

    close() {
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myOverlay").style.display = "none";
    }

    render() {
        return (
            <header>
                <nav className="w3-bar ct-blue">
                    <div className="w3-sidebar sidebar w3-bar-block w3-border-right w3-text-white ct-blue" id="mySidebar">
                        <button onClick={this.close}
                                className="w3-bar-item w3-button w3-large w3-text-white">Close &times;</button>
                        <a href="#" className="w3-bar-item w3-button" onClick={this.props.renderScores}>Scores</a>
                        <a href="#" className="w3-bar-item w3-button" onClick={this.props.renderRanking}>Classement</a>
                        <a href="#" className="w3-bar-item w3-button">Règles</a>
                    </div>

                    <div className="w3-content w3-center nav">
                        <a className="w3-bar-item w3-left w3-hide-large w3-hide-medium ct-hover-dark-blue"
                           onClick={this.open}>
                            <img src="/img/mots-caches.png" alt="logo " width="60"
                                 className="w3-image"/>
                        </a>

                        <a href="" className="w3-bar-item w3-large coda ct-hover-dark-blue">
                            <img src="/img/mots-caches.png" alt="logo MD" width="90"
                                 className="w3-image w3-hide-small"/>
                                <b className="w3-hide-medium w3-hide-large">Matthieu Dehondt <br/> Games</b>
                        </a>

                        <div className="w3-right w3-padding-16 w3-hide-small">
                            <button className="w3-bar-item w3-large ct-hover-dark-blue ct-blue" onClick={this.props.renderScores}><b>Scores</b></button>
                            <button className="w3-bar-item w3-large ct-hover-dark-blue ct-blue" onClick={this.props.renderRanking}><b>Classement</b></button>
                            <button className="w3-bar-item w3-large ct-hover-dark-blue ct-blue"><b>Règles</b></button>
                        </div>
                    </div>
                </nav>
                <div className="w3-overlay w3-animate-opacity pointer" onClick={this.close} id="myOverlay"></div>
            </header>
        );
    }
}

export default Header;
