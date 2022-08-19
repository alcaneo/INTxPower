import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

class Algorithms {
    static ALGO_TWO_TAILED_TESTING = 'twoTailedTesting'
    static ALGO_ONE_TAILED_TESTING = 'oneTailedTesting'
    static ALGO_MIXED_PARTICIPANTS = 'mixedParticipants'
    static ALGO_PLANNED_CONTRAST = 'plannedContrast'

    static compute(algo, a, b, c, d) {
        switch (algo) {
            case this.ALGO_ONE_TAILED_TESTING:
                return this.computeOneTailedTestingAlgo(a, b, c, d)
            case this.ALGO_MIXED_PARTICIPANTS:
                return this.computeMixedParticipantsAlgo(a, b, c, d)
            case this.ALGO_PLANNED_CONTRAST:
                return this.computePlannedContrastAlgo(a, b, c, d)
            case this.ALGO_TWO_TAILED_TESTING:
            default:
                return this.computeTwoTailedTestingAlgo(a, b, c, d)
        }
    }

    static computeTwoTailedTestingAlgo(a, b, c, d) {
        if (this.isInfinity(a, b, c, d)) {
            return 'Infinity'
        }
        return Math.ceil(125.44 / Math.pow((a - b - c + d), 2))
    }

    static computeOneTailedTestingAlgo(a, b, c, d) {
        if (this.isInfinity(a, b, c, d)) {
            return 'Infinity'
        }
        return Math.ceil(98.8036 / Math.pow((a - b - c + d), 2))
    }

    static computeMixedParticipantsAlgo(a, b, c, d) {
        if (this.isInfinity(a, b, c, d)) {
            return 'Infinity'
        }
        return Math.ceil(62.72 / Math.pow((a - b - c + d), 2))
    }

    static computePlannedContrastAlgo(a, b, c, d) {
        if ((a === b && b === c && c !== d) ||
            (a === b && b === d && d !== c) ||
            (a === c && c === d && d !== b) ||
            (b === c && c === d && d !== a)) {
            return Math.ceil(41.813 / Math.pow((a - b - c + d), 2))
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

    static isInfinity(a, b, c, d) {
        return (a === b && c === d) || (a === c && b === d)
    }
}

export default Algorithms
