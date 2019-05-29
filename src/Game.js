import React, { Component } from 'react';
import cardData from "./cards.json";

class Game extends Component {
  state = {
    cardData : [...cardData],
    score: 0,
    highScore: 0
  };

  handleClick = cardId => {
    var isCorrect = false;

    const cardData = [...this.state.cardData];

    cardData.forEach(card => {
    if (card.id === cardId) {
      if (!card.clicked) {
        isCorrect = true;
        card.clicked = true;
      }
    }
  });

  isCorrect ? this.handleCorrect(cardData) : this.handleIncorrect(cardData);
  }

  handleCorrect = cardData => {
     
     const shuffledCards = cardData.sort(() => 0.5 - Math.random());
     const score = this.state.score + 1;

     let highScore = this.state.highScore;

     if (score > highScore) {
       highScore = score;
     }

     this.setState({
       cardData: shuffledCards,
       score: score,
       highScore: highScore
     });

     if (score === 12) {
      alert("You got 'em all!  You should probably stop playing now...");
      this.setState({
        cardData: shuffledCards,
        score: score,
        highScore: highScore
      })
    }
  }

  handleIncorrect = cardData => {
    const shuffledCards = cardData.sort(() => 0.5 - Math.random());

    shuffledCards.forEach(card => (card.clicked = false));
    alert("You already clicked that one! Try again!");
    this.setState({
      cardData: shuffledCards,
      score: 0
    });
  };


  render() {
    return (
      <React.Fragment>
        <div className = "jumbotron bg-info text-dark text-center">
          <h1>Welcome to the Clicky-Game!</h1>
          <h3>Try to click every image once without repeating!</h3>
          <h4>Current Score: {this.state.score} | High Score: {this.state.highScore}</h4>
        </div>

        <div className="container-fluid bg-warning">
          <div className="row align-items-center justify-content-between">
            
            {this.state.cardData.map(card => {
              return (
                <div className="col-10 col-sm-3 col-md-2" key={card.id}>
                  <img
                    src={card.image}
                    alt={card.name}
                    className="img-fluid img-thumbnail rounded mx-auto my-2"
                    onClick={() => this.handleClick(card.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>

      </React.Fragment>
    )
  }
  }

  export default Game;
