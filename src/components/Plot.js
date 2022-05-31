import { Component } from 'react';
import {DiscreteColorLegend, HorizontalGridLines, VerticalBarSeries, XAxis, XYPlot, YAxis} from "react-vis";
import Controllers from "./Controllers";

class Plot extends Component {
    minValue = 0
    maxValue = 1.2

    constructor(props) {
        super(props);
        this.state = {
            dataSet1: this.props.dataSet1,
            dataSet2: this.props.dataSet2
        }
    }

     onChangeCallback = (dataSet, position, value) => {
        console.log(`Change committed with value: ${value}`)
         if (dataSet === 1) {
             const newState = this.state.dataSet1
             newState[position].y = value
             this.setState({
                 dataSet1: newState
             })
         } else if (dataSet === 2) {
             const newState = this.state.dataSet2
             newState[position].y = value
             this.setState({
                 dataSet2: newState
             })
         }

         this.props.onChange(this.state.dataSet1, this.state.dataSet2)
    }

    render() {
        return (
            <div>
                <XYPlot yPadding={120} height={this.props.height} width={this.props.width} yDomain={[this.minValue, this.maxValue]}>
                    <DiscreteColorLegend
                        style={{position: 'absolute', right: '50px', top: '10px'}}
                        orientation="horizontal"
                        items={[
                            {
                                title: 'Chick',
                                color: '#4472C4'
                            },
                            {
                                title: 'Dude',
                                color: '#C00000'
                            }
                        ]}
                    />
                    <HorizontalGridLines/>
                    <XAxis tickValues={[1, 2]} tickFormat={value => this.props.legend[value]} />
                    <YAxis title="Standardized mean" position="middle" tickTotal={8} tickFormat={value => value === 0 ? '0' : value.toFixed(1)} />
                    <VerticalBarSeries
                        onSeriesClick={(event)=>{
                            console.log("coucou")
                            // does something on click
                            // you can access the value of the event
                        }}
                        color="#4472C4"
                        data={this.state.dataSet1}
                    />
                    <VerticalBarSeries
                        color="#C00000"
                        data={this.state.dataSet2}
                    />
                </XYPlot>
                <Controllers onChangeCommitted={this.onChangeCallback} min={this.minValue} max={this.maxValue} />
            </div>
        )
    }
}

export default Plot
