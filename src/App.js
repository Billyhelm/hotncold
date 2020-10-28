import React from 'react';

import{Grid, Typography, Paper, Divider, Button } from '@material-ui/core';

import Form from './components/Form';
import Progress from './components/Progress';
import './app.css';

import {generateRandomNumber, getFeedback} from './util'

class App extends React.Component {

  state = {
    generateNumber: generateRandomNumber(),
    guess: undefined,
    allGuesses: [],
    attempt: 0,
    feedbackMessage: 'Guess between 1 and 100', 
    feedbackColor: '#fff',
    block: false 
  }

  resetGame = () => {
    this.setState({
      generateNumber: generateRandomNumber(),
      guess: undefined,
      allGuesses: [],
      attempt: 0,
      feedbackMessage: 'Guess between 1 and 100', 
      feedbackColor: '#fff',
      block: false 

    })
  }

  updateAppState = (guess) => {
    const absDif = Math.abs(guess - this.state.generateNumber);
    const {feedbackMessage, feedbackColor} = getFeedback(absDif)

    this.setState(prevState => ({
      guess, 
      allGuesses: [...prevState.allGuesses,{guess, feedbackColor}],
      attempt: prevState.attempt + 1,
      feedbackMessage, 
      block: absDif === 0

    }))
  }

  render() {
    const { allGuesses, attempt, feedbackMessage, block } = this.state;
    
    const guessList = allGuesses.map((item,index) =>(
    <li key={index}>
      <span>{item.guess}</span>
    </li>
  ));

  return (
    <Grid container style={{height: '100vh'}} justify="center" alignItems="center">
      <Grid item xs={3}>
        <Paper style={{padding: '50px'}} elevation={6}>
          <Typography align="center" variant="h2" gutterBottom>Hot or Cold</Typography>
          <Divider style={{ margin: '20px 0'}} />
          <div className={`feedback ${feedbackMessage[0].toLowerCase()}`}>
  <h2 className='feedback-text'>{feedbackMessage}</h2>
          </div>
          <Form returnGuessToApp={guess => this.updateAppState(guess)} block={block}/>
          <Progress attempt={attempt} guessList={guessList} feedbackMessage={feedbackMessage}/>
          <Button style={{marginBottom: '15px'}} fullWidth variant='contained' color='primary' onClick={this.resetGame}>Reset Game</Button>
        </Paper>
      </Grid>
    </Grid>
  );
  }
}

export default App;
