import {Component} from "react";
import {Typography} from "@mui/material";

class Score extends Component {
    getComputedScore(a, b, c, d) {
        return 125.44 / Math.pow((a - b - c + d), 2)
    }

    render() {
        const score = this.getComputedScore(this.props.A, this.props.B, this.props.C, this.props.D)

        return (
            <Typography variant="h2" align="center">{Math.ceil(score)}</Typography>
        )
    }
}

export default Score
