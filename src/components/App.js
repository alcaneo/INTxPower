import './App.css';
import 'react-vis/dist/style.css';
import {Component} from "react";
import Score from "./Score";
import {Box, Card, CardContent, CardHeader, createTheme, Divider, ThemeProvider, Typography} from "@mui/material";
import Controllers from "./Controllers";
import {indigo, red} from "@mui/material/colors";
import {useLocation, useNavigate} from "react-router";

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} location={useLocation()} />;
}

class App extends Component {
    minValue = 0
    maxValue = 1.2

    constructor(props) {
        super(props);
        const queryParameters = new URLSearchParams(this.props.location.search);
        this.state = {
            A: parseFloat(queryParameters.get('A')) || 0.6,
            B: parseFloat(queryParameters.get('B')) || 0.4,
            C: parseFloat(queryParameters.get('C')) || 0.4,
            D: parseFloat(queryParameters.get('D')) || 0.6
        }
        this.updateUrl()
    }

    onChangeCallback = (name, value) => {
        this.setState({
            [name]: value
        })
        this.updateUrl()
    }

    updateUrl = () => {
        this.props.navigate({
            pathname: '/',
            search: '?' + new URLSearchParams({
                A: this.state.A,
                B: this.state.B,
                C: this.state.C,
                D: this.state.D
            }).toString()
        })
    }

    render() {
        const theme = createTheme({
            palette: {
                primary: {
                    main: indigo[500],
                },
                secondary: {
                    main: red[500],
                },
            },
        });

        return (
            <ThemeProvider theme={theme}>
                <Box sx={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                    <Typography variant="h6">
                        Required overall sample size to detect a first-order interaction with a power of .80 and two-tailed alpha of .05
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', textAlign: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                    <Typography variant="subtitle1">
                        Draw the expected shape of the interaction by moving the bars
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap'}}>
                    <Box>
                        <Controllers onChangeCommitted={this.onChangeCallback} min={this.minValue} max={this.maxValue}  A={this.state.A} B={this.state.B} C={this.state.C} D={this.state.D} />
                    </Box>
                    <Box sx={{display: 'flex', rowGap: '30px', flexDirection: 'column'}}>
                        <Box>
                            <Card>
                                <CardHeader title="Required overall sample size" />
                                <Divider variant="middle" />
                                <CardContent>
                                    <Score A={this.state.A} B={this.state.B} C={this.state.C} D={this.state.D} />
                                </CardContent>
                            </Card>
                        </Box>
                        <Box>
                            <Card>
                                <CardHeader title="Moderator" />
                                <Divider variant="middle" />
                                <CardContent>
                                    <Typography color="primary">
                                        Group A<br />
                                        Expected effect size for predictor Cohen's d = {(this.state.C - this.state.A).toFixed(2)}
                                    </Typography>
                                    <Typography color="secondary">
                                        Group B<br />
                                        Expected effect size for predictor Cohen's d = {(this.state.D - this.state.B).toFixed(2)}
                                    </Typography>
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
