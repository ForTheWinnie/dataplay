import React, { useState } from "react";
import "./App.css";
import data from "./annotatedData.geo.json";
import Map from "./components/Map/Map";
import { Chart } from "react-google-charts";
import { accidentData } from "./simplerNeighborhoodData.js";

function App() {
  const [property, setProperty] = useState("total"); // setting default year for map filter
  return (
    <>
      <h1>Car crashes in Washington D.C. neighborhoods</h1>
      <h2>(2010-2014)</h2>
      <p>Click on the neighborhoods to zoom in and see the number of car crashes. Click again to zoom out.</p>
      <h3>Filter by year</h3>
      <select
        value={property}
        onChange={event => setProperty(event.target.value)} className="mapFilter">
        <option value="total">Total (5 years)</option>
        <option value="2014">2014</option>
        <option value="2013">2013</option>
        <option value="2012">2012</option>
        <option value="2011">2011</option>
        <option value="2010">2010</option>
      </select>
      {/* geo map using d3 */}
      <Map data={data} property={property} />
      
      {/* bar chart using react-google-charts */}
      <Chart
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={accidentData}
        options={{
          height: 350,
          vAxis: {
            title: "Neighborhood",
            minValue: 1
          },
          hAxis: {
            title: "Car Crashes",
            ticks: [0, 1, 2, 3, 4, 5, 6]
          },
          bars: "horizontal",
          axes: {
            y: {
              0: { side: "right" },
            },
          },
        }}
        rootProps={{ "data-testid": "1" }}
        chartWrapperParams={{ view: { rows: [1-1] } }} // display Naylor Gardens as default neighborhood
        controls={[
          {
            controlEvents: [
              {
                eventName: "statechange",
              },
            ],
            controlType: "CategoryFilter",
            options: {
              filterColumnIndex: 0, // filter by neighborhood
              ui: {
                labelStacking: "vertical",
                label: "Filter by neighborhood using the drop-down below",
                allowTyping: false,
                allowMultiple: false,
              },
            },
          },
        ]}
      />
    </>
  );
}

export default App;
