import {Component} from 'react'
import {
    Box,
    Slider,
    styled,
    Typography
} from '@mui/material';

class Controllers extends Component {
    step = 0.05

    constructor(props) {
        super(props);
    }

    render() {
        const StyledSlider = styled(Slider)(({ theme }) => ({
            width: 100,
            height: 620,
            margin: 0,
            marginLeft: 5,
            padding: 0,
            '& .MuiSlider-markLabel': {
                left: -30
            },
            '& .MuiSlider-mark': {
                display: 'none'
            },
            '@media (pointer: coarse)': {
                padding: '0 5px',
                marginLeft: 2
            },
            [theme.breakpoints.only('xs')]: {
                width: 65,
                height: 500
            }
        }))

        return (
            <Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', textAlign: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                        <Typography variant="subtitle1" sx={{fontSize: '1.2rem'}}>
                            Draw the shape of the expected interaction
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <Box sx={{width: '20px', height: '500px', position: 'relative'}}>
                            <Typography style={{transform: 'rotate(-90deg)', whiteSpace: 'nowrap', position: 'absolute', left: 0, bottom: '25%', width: '20px', fontSize: '1.2rem' }}>
                                Outcome (standardized mean)
                            </Typography>
                        </Box>
                        <Box sx={{marginLeft: '30px'}}>
                            <StyledSlider
                                aria-label='Predictor group 1 - Moderator group A'
                                orientation='vertical'
                                valueLabelDisplay='auto'
                                defaultValue={this.props.A}
                                step={this.step}
                                marks={this.getMarks(this.props.min, this.props.max, this.step)}
                                min={this.props.min}
                                max={this.props.max}
                                onChangeCommitted={(event, value) => {
                                    this.props.onChangeCommitted('A', value)
                                }}
                            />
                        </Box>
                        <Box>
                            <StyledSlider
                                aria-label='Predictor group 1 - Moderator group B'
                                orientation='vertical'
                                valueLabelDisplay='auto'
                                defaultValue={this.props.B}
                                step={this.step}
                                marks
                                min={this.props.min}
                                max={this.props.max}
                                onChangeCommitted={(event, value) => {
                                    this.props.onChangeCommitted('B', value)
                                }}
                                color='secondary'
                            />
                        </Box>
                        <Box sx={{ml: 2}}>
                            <StyledSlider
                                aria-label='Predictor group 2 - Moderator group A'
                                orientation='vertical'
                                valueLabelDisplay='auto'
                                defaultValue={this.props.C}
                                step={this.step}
                                marks
                                min={this.props.min}
                                max={this.props.max}
                                onChangeCommitted={(event, value) => {
                                    this.props.onChangeCommitted('C', value)
                                }}
                            />
                        </Box>
                        <Box>
                            <StyledSlider
                                aria-label='Predictor group 2 - Moderator group B'
                                orientation='vertical'
                                valueLabelDisplay='auto'
                                defaultValue={this.props.D}
                                step={this.step}
                                marks
                                min={this.props.min}
                                max={this.props.max}
                                onChangeCommitted={(event, value) => {
                                    this.props.onChangeCommitted('D', value)
                                }}
                                color='secondary'
                            />
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', paddingLeft: '50px', columnGap: '40px'}}>
                        <Box sx={{flexGrow: 2, textAlign: 'center'}}>
                            <Typography>Group 1</Typography>
                        </Box>
                        <Box sx={{flexGrow: 2, textAlign: 'center'}}>
                            <Typography>Group 2</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography sx={{paddingLeft: '60px'}}>Predictor</Typography>
                    </Box>
                </Box>
            </Box>
        )
    }

    getMarks(min, max, step) {
        const marks = []
        for (let i = min; i <= (max + step); i += step) {
            marks.push({
                value: i.toFixed(2),
                label: i.toFixed(2)
            })
        }
        return marks
    }
}

export default Controllers
