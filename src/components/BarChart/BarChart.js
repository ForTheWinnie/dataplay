import React from "react";
import "./BarChart.css";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

/*
* Not used
*/

const BarChart = (props) => {

    const dataArr = props.data.map((d)=> {
        return {x: d.properties.objectid, 
        y: parseFloat(d.properties.total)}
    });

    return (
        <XYPlot
            xType="ordinal"
            width={1000}
            height={500}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Period of time(year and quarter)" />
            <YAxis title="Number of pull requests (thousands)" />
                <LineSeries
                    data={dataArr}
                    style={{stroke: 'violet', strokeWidth: 3}}/>
        </XYPlot>
    );
}

export default BarChart;