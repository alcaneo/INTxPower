import {Component} from 'react';
import {Typography} from '@mui/material';
import Algorithms from "../services/Algorithms";

class Score extends Component {
    render() {
        const score = Algorithms.compute(this.props.algo,
            this.props.A,
            this.props.B,
            this.props.C,
            this.props.D,
            this.props.targetPower
        )

        return (
            <Typography variant='h2' align='center'>{score}</Typography>
        )
    }
}

export default Score
