import './App.css';
import 'react-vis/dist/style.css';
import {Component} from 'react';
import Score from './Score';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    createTheme,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Link,
    Radio,
    RadioGroup, responsiveFontSizes,
    Table,
    TableBody, tableBodyClasses,
    TableCell, tableCellClasses, TableHead, tableHeadClasses,
    TableRow, tableRowClasses,
    ThemeProvider,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Controllers from './Controllers';
import {grey, indigo, red} from '@mui/material/colors';
import {useLocation, useNavigate} from 'react-router';
import Algorithms from "../services/Algorithms";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = 'G-SLLMJ872RN'
ReactGA.initialize(GA_MEASUREMENT_ID)
ReactGA.send('pageview')

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} location={useLocation()}/>
}

class App extends Component {
    minValue = 0
    maxValue = 1.2

    constructor(props) {
        super(props)
        const queryParameters = new URLSearchParams(this.props.location.search)
        this.state = {
            A: parseFloat(queryParameters.get('A')) || 0.6,
            B: parseFloat(queryParameters.get('B')) || 0.4,
            C: parseFloat(queryParameters.get('C')) || 0.4,
            D: parseFloat(queryParameters.get('D')) || 0.6,
            algo: queryParameters.get('algo') || Algorithms.ALGO_TWO_TAILED_TESTING,
            dialogSetOpen: false
        }
        this.updateUrl()
    }

    onChangeCallback = (name, value) => {
        this.setState({
            [name]: value
        })
        this.updateUrl()
    }

    updateUrl = (eventName) => {
        this.props.navigate({
            pathname: '/',
            search: '?' + new URLSearchParams({
                A: this.state.A,
                B: this.state.B,
                C: this.state.C,
                D: this.state.D,
                algo: this.state.algo
            }).toString()
        })
        if (eventName) {
            ReactGA.event(eventName)
        }
    }

    updateParameters = (stateParameters, evenName) => {
        this.setState(stateParameters, () => {
            this.updateUrl(evenName)
        })
    }

    changeAlgo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const algo = event.target.value

        this.updateParameters({
            algo: algo
        }, algo)
    }

    setDefaultParameters = (defaultStrategyName) => {
        this.updateParameters(
            Algorithms.getDefaultParametersForStrategy(defaultStrategyName),
            defaultStrategyName
        )
    }

    handleClickOpen = () => {
        this.setState({dialogSetOpen: true})
    }

    handleClose = () => {
        this.setState({dialogSetOpen: false})
    };

    render() {
        let theme = createTheme({
            palette: {
                primary: {
                    main: indigo[500]
                },
                secondary: {
                    main: red[500]
                }
            }
        });
        theme = responsiveFontSizes(theme);

        return (
            <ThemeProvider theme={theme}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '30px'}}>
                    <Box sx={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                        <Typography variant='h5'>
                            INT×Power: Finding the target sample size to detect a two-way interaction with power .80 (α = .05)
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap'}}>
                        <Box>
                            <Box sx={{display: 'flex', columnGap: '10px'}}>
                                <Card sx={{flexGrow: 1}}>
                                    <CardHeader title='Moderator'/>
                                    <Divider variant='middle'/>
                                    <CardContent>
                                        <Box>
                                            <Box sx={{
                                                width: '12px',
                                                height: '12px',
                                                backgroundColor: indigo[500],
                                                display: 'inline-block'
                                            }}></Box>
                                            <Typography color='primary'
                                                        sx={{display: 'inline-block', marginLeft: '10px'}}>Group
                                                A</Typography>
                                        </Box>
                                        <Box>
                                            <Box sx={{
                                                width: '12px',
                                                height: '12px',
                                                backgroundColor: red[500],
                                                display: 'inline-block'
                                            }}></Box>
                                            <Typography color='secondary'
                                                        sx={{display: 'inline-block', marginLeft: '10px'}}>Group
                                                B</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                                <Card sx={{flexGrow: 2}}>
                                    <CardHeader title={
                                        <Typography variant="h5" component="h2">
                                            Cohen's <i>d</i>
                                        </Typography>
                                    }/>
                                    <Divider variant='middle'/>
                                    <CardContent>
                                        <Typography color='primary'>
                                            Group A simple effect = {(this.state.C - this.state.A).toFixed(2)}
                                        </Typography>
                                        <Typography color='secondary'>
                                            Group B simple effect = {(this.state.D - this.state.B).toFixed(2)}
                                        </Typography>
                                        <Typography sx={{color: grey[700]}}>
                                            Two-way interaction
                                            = {((this.state.C - this.state.A - this.state.D + this.state.B) / 2).toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                        <Box>
                            <Controllers onChangeCommitted={this.onChangeCallback} min={this.minValue}
                                         max={this.maxValue} A={this.state.A} B={this.state.B} C={this.state.C}
                                         D={this.state.D}/>
                        </Box>
                        <Box sx={{display: 'flex', rowGap: '30px', flexDirection: 'column'}}>
                            <Box>
                                <Card>
                                    <CardHeader title='REQUIRED OVERALL SAMPLE SIZE'/>
                                    <Divider variant='middle'/>
                                    <CardContent>
                                        <Score A={this.state.A} B={this.state.B} C={this.state.C} D={this.state.D}
                                               algo={this.state.algo}/>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardContent>
                                        <FormControl>
                                            <RadioGroup name='algo-option-group'
                                                        value={this.state.algo}
                                                        onChange={this.changeAlgo}>

                                                <Table sx={{
                                                    [`& .${tableCellClasses.root}`]: {
                                                        borderBottom: "none",
                                                        padding: '0 8px'
                                                    },
                                                    [`& .${tableHeadClasses.root} .${tableCellClasses.root}`]: {
                                                        paddingBottom: '10px'
                                                    },
                                                    [`& .${tableBodyClasses.root} .${tableRowClasses.root}:hover`]: {
                                                        backgroundColor: "rgba(63, 81, 181, .38)"
                                                    },
                                                    [theme.breakpoints.only('xs')]: {
                                                        [`& .${tableCellClasses.root}`]: {
                                                            padding: '0 5px'
                                                        }
                                                    }
                                                }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center" colSpan={2}>
                                                                <Typography variant="h5">Options</Typography>
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                <Typography variant="h5">Design</Typography>
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                <Typography variant="h5">Testing</Typography>
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                <Typography variant="h5">Approach</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="center" colSpan={2}>
                                                                <FormControlLabel
                                                                    control={<Radio/>}
                                                                    label=''
                                                                    value={Algorithms.ALGO_TWO_TAILED_TESTING}/>
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Between
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Two-tailed
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Factorial
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="center" colSpan={2}>
                                                                <FormControlLabel
                                                                    control={<Radio/>}
                                                                    label=''
                                                                    value={Algorithms.ALGO_ONE_TAILED_TESTING}/>
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Between
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                One-tailed
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Factorial
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="center" colSpan={2}>
                                                                <FormControlLabel
                                                                    control={<Radio/>}
                                                                    label=''
                                                                    value={Algorithms.ALGO_MIXED_PARTICIPANTS}/>
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Mixed
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Two-tailed
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Factorial
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="center" colSpan={2}>
                                                                <FormControlLabel
                                                                    control={<Radio/>}
                                                                    label=''
                                                                    value={Algorithms.ALGO_PLANNED_CONTRAST}/>
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Between
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Two-tailed
                                                            </TableCell>
                                                            <TableCell align="center" colSpan={3}>
                                                                Contrast
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </RadioGroup>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardHeader title="Not sure where to start?"
                                                subheader='Consider one of the following:'/>
                                    <Divider variant='middle'/>
                                    <CardContent sx={{
                                        [`& button`]: {
                                            fontSize: 'inherit'
                                        }
                                    }}>
                                        <Link sx={{display: 'block'}}
                                              onClick={() => {
                                                this.setDefaultParameters(Algorithms.DEFAULT_MEDIUM_SIZED_REVERSED_INTERACTION)
                                              }}
                                              component='button'>
                                            A medium-sized reversed interaction
                                        </Link>
                                        <Link sx={{display: 'block'}}
                                              onClick={() => {
                                                  this.setDefaultParameters(Algorithms.DEFAULT_MEDIUM_SIZED_FULLY_ATTENUATED_INTERACTION)
                                              }}
                                              component='button'>
                                            A medium-sized fully attenuated interaction
                                        </Link>
                                        <Link sx={{display: 'block'}}
                                              onClick={() => {
                                                  this.setDefaultParameters(Algorithms.DEFAULT_MEDIUM_SIZED_PARTIALLY_ATTENUATED_INTERACTION)
                                              }}
                                              component='button'>
                                            A medium-sized partially attenuated interaction
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', rowGap: '30px', maxWidth: '936px', flexDirection: 'column'}}>
                        <Box>
                            <Card>
                                <CardContent sx={{textAlign: 'center'}}>
                                    <Button variant="outlined" onClick={this.handleClickOpen}>
                                        Information and note about this web app
                                    </Button>
                                    <Dialog onClose={this.handleClose} open={this.state.dialogSetOpen}>
                                        <IconButton
                                            aria-label="close"
                                            onClick={this.handleClose}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: (theme) => theme.palette.grey[500],
                                            }}
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                        <DialogTitle>Information and note about this web app</DialogTitle>
                                        <DialogContent>
                                            The article associated with this app can be found here [the hyperlink will
                                            be provided later obviously]<br/>
                                            <br/>
                                            We recommend using the following empirically derived benchmarks to describe
                                            small, medium, and large simple effects: d = 0.20, 0.35, and 0.50,
                                            respectively (<Link href='https://doi.org/10.3389/fpsyg.2019.00813'
                                                                target='_blank'>see Schäfer & Schwarz, 2019</Link>)<br/>
                                            <br/>
                                            The calculation of the required sample size assumes linearity, approximate
                                            multivariate normality, homogeneity of variance across subgroups,
                                            independence of residual error, lack of severe multicollinearity, and equal
                                            sample size across the 2 × 2 subgroups.<br/>
                                            <br/>
                                            The app can be used to calculate the required sample size to detect two-way
                                            interactions involving continuous and/or dichotomous predictors/moderators,
                                            assuming that there is no measurement error (measurement error would
                                            diminish effect sizes).<br/>
                                            <br/>
                                            For the calculation involving mixed-participants designs, sphericity is
                                            assumed to be satisfied and the by-default correlation between the
                                            measurements is assumed to be ρ = .50 (a conservative estimate;
                                            <Link href='http://doi.org/10.5334/joc.72' target='_blank'>
                                                see Brysbaert, 2019</Link>).
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box>
                            <Card>
                                <CardContent>
                                    Please cite as follows: Sommet, N., Weissman, D. L., Cheutin, N., & Elliot, A. J. (2022).<br />
                                    How many participants do I need to test an interaction? Conducting an appropriate power analysis and achieving sufficient power to detect an interaction.
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        )
    }
}

export default withNavigation(App);
