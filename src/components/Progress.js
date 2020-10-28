import React from 'react';
import { Typography } from '@material-ui/core';
import './progress.css'

const Progress = ({attempt, guessList}) => (
    <div>
        <Typography className="progressBar" variant="h2">Guess # {attempt}</Typography>
        <ul className="progressBar_history">
            {guessList}
        </ul>
        
    </div>
)

export default Progress