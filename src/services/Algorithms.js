import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import data from '../resources/magicNumbers.json';

class Algorithms {
    static ALGO_BETWEEN_TWO_TAILED_FACTORIAL = 'betweenTwoTailedFactorial'
    static ALGO_BETWEEN_ONE_TAILED_FACTORIAL = 'betweenOneTailedFactorial'
    static ALGO_MIXED_TWO_TAILED_FACTORIAL = 'mixedTwoTailedFactorial'
    static ALGO_MIXED_ONE_TAILED_FACTORIAL = 'mixedOneTailedFactorial'
    static ALGO_BETWEEN_TWO_TAILED_CONTRAST = 'betweenTwoTailedContrast'
    static ALGO_BETWEEN_ONE_TAILED_CONTRAST = 'betweenOneTailedContrast'
    static DEFAULT_TYPICAL_REVERSED_INTERACTION = 'typicalReversedInteraction'
    static DEFAULT_TYPICAL_FULLY_ATTENUATED_INTERACTION = 'typicalFullyAttenuatedInteraction'
    static DEFAULT_TYPICAL_PARTIALLY_ATTENUATED_INTERACTION = 'typicalPartiallyAttenuatedInteraction'

    static compute(algo, a, b, c, d, magicNumber) {
        switch (algo) {
            case this.ALGO_BETWEEN_ONE_TAILED_FACTORIAL:
                return this.computeBetweenOneTailedFactorialAlgo(a,
                    b,
                    c,
                    d,
                    this.getMagicNumberForAlgo(this.ALGO_BETWEEN_ONE_TAILED_FACTORIAL, magicNumber))
            case this.ALGO_MIXED_TWO_TAILED_FACTORIAL:
                return this.computeMixedTwoTailedFactorialAlgo(a,
                    b,
                    c,
                    d,
                    this.getMagicNumberForAlgo(this.ALGO_MIXED_TWO_TAILED_FACTORIAL, magicNumber))
            case this.ALGO_MIXED_ONE_TAILED_FACTORIAL:
                return this.computeMixedOneTailedFactorialAlgo(a,
                    b,
                    c,
                    d,
                    this.getMagicNumberForAlgo(this.ALGO_MIXED_ONE_TAILED_FACTORIAL, magicNumber))
            case this.ALGO_BETWEEN_TWO_TAILED_CONTRAST:
                return this.computeBetweenTwoTailedContrastAlgo(a,
                    b,
                    c,
                    d,
                    this.getMagicNumberForAlgo(this.ALGO_BETWEEN_TWO_TAILED_CONTRAST, magicNumber))
            case this.ALGO_BETWEEN_ONE_TAILED_CONTRAST:
                return this.computeBetweenOneTailedContrastAlgo(a,
                    b,
                    c,
                    d,
                    this.getMagicNumberForAlgo(this.ALGO_BETWEEN_ONE_TAILED_CONTRAST, magicNumber))
            case this.ALGO_BETWEEN_TWO_TAILED_FACTORIAL:
            default:
                return this.computeBetweenTwoTailedFactorialAlgo(a,
                    b,
                    c,
                    d,
                    this.getMagicNumberForAlgo(this.ALGO_BETWEEN_TWO_TAILED_FACTORIAL, magicNumber))
        }
    }

    static getMagicNumberForAlgo(algo, magicNumber) {
        return data[(magicNumber / 100)][algo]
    }

    static computeBetweenTwoTailedFactorialAlgo(a, b, c, d, magicNumber) {
        if (this.isInfinity(a, b, c, d)) {
            return 'Infinity'
        }
        return this.round(magicNumber / Math.pow((a - b - c + d), 2))
    }

    static computeBetweenOneTailedFactorialAlgo(a, b, c, d, magicNumber) {
        if (this.isInfinity(a, b, c, d)) {
            return 'Infinity'
        }
        return this.round(magicNumber / Math.pow((a - b - c + d), 2))
    }

    static computeMixedTwoTailedFactorialAlgo(a, b, c, d, magicNumber) {
        if (this.isInfinity(a, b, c, d)) {
            return 'Infinity'
        }
        return this.round(magicNumber / Math.pow((a - b - c + d), 2))
    }

    static computeMixedOneTailedFactorialAlgo(a, b, c, d, magicNumber) {
        if (this.isInfinity(a, b, c, d)) {
            return 'Infinity'
        }
        return this.round(magicNumber / Math.pow((a - b - c + d), 2))
    }

    static computeBetweenTwoTailedContrastAlgo(a, b, c, d, magicNumber) {
        return this.computeBetweenTailedContrastAlgo(a, b, c, d, magicNumber)
    }

    static computeBetweenOneTailedContrastAlgo(a, b, c, d, magicNumber) {
        return this.computeBetweenTailedContrastAlgo(a, b, c, d, magicNumber)
    }

    static computeBetweenTailedContrastAlgo(a, b, c, d, magicNumber) {
        if ((a === b && b === c && c !== d) ||
            (a === b && b === d && d !== c) ||
            (a === c && c === d && d !== b) ||
            (b === c && c === d && d !== a)) {
            return this.round(magicNumber / Math.pow((a - b - c + d), 2))
        } else {
            return <Tooltip title='Not applicable, the interaction is not a fully attenuated interaction'>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                    <Typography variant='h2' align='center'>n/a</Typography>
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Box>
            </Tooltip>
        }
    }

    static getDefaultParametersForStrategy(strategyName) {
        switch (strategyName) {
            case this.DEFAULT_TYPICAL_FULLY_ATTENUATED_INTERACTION:
                return {
                    A: 0.5,
                    B: 0.5,
                    C: 0.5,
                    D: 0.85,
                    algo: this.ALGO_BETWEEN_TWO_TAILED_FACTORIAL
                }
            case this.DEFAULT_TYPICAL_REVERSED_INTERACTION:
                return {
                    A: 0.85,
                    B: 0.5,
                    C: 0.5,
                    D: 0.85,
                    algo: this.ALGO_BETWEEN_TWO_TAILED_FACTORIAL
                }
            case this.DEFAULT_TYPICAL_PARTIALLY_ATTENUATED_INTERACTION:
                return {
                    A: 0.5,
                    B: 0.5,
                    C: 0.85,
                    D: 1.0,
                    algo: this.ALGO_BETWEEN_TWO_TAILED_FACTORIAL
                }
            default:
                return {}
        }
    }

    static isInfinity(a, b, c, d) {
        return (a === b && c === d) ||
            (a === c && b === d) ||
            (this.roundToTwo(a - b) === this.roundToTwo(c - d))
    }

    static round(number) {
        return Math.round(number)
    }

    static roundToTwo(number) {
        return Math.round((number + Number.EPSILON) * 100) / 100
    }
}

export default Algorithms
