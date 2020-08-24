import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import useResizeObserver from "../../useResizeObserver";
import "./Map.css";

/**
 * Component that renders a map of D.C.
 */

function Map({ data, property }) {
    const svgMapRef = useRef();
    const wrapperMapRef = useRef();
    const dimensions = useResizeObserver(wrapperMapRef);
    const [SelectedNeighborhood, setSelectedNeighborhood] = useState(null);
  
    useEffect(() => {
      const svg = select(svgMapRef.current);
  
      // minimum and max values of each neighborhood & apply color scale
      const minProperty = min(data.features, feature => feature.properties[property]);
      const maxProperty = max(data.features, feature => feature.properties[property]);
      const colorScale = scaleLinear()
        .domain([minProperty, maxProperty])
        .range(["#ccc", "#008080"]);

      
      // dimensions of the map (fallback with getBoundingClientRect since dimensions are null initially)
      const { width, height } =
       dimensions || wrapperMapRef.current.getBoundingClientRect();
  
      // render coord into px values via d3's geoMercator projection while fitting map in svg; increase quality of zoom in/out with .precision
      const projection = geoMercator()
        .fitSize([width, height], SelectedNeighborhood || data);
  
      // transform .geo.json data into shapes 
      const pathGenerator = geoPath().projection(projection);

      function mouseEnter(d,i) {
        svg.selectAll(".label")
          .join("text")
          .attr("class", "label")
          .text(d.properties.name)
          .attr("x", 205)
          .attr("y", 25);
      }
      // render each neighborhood
      svg.selectAll(".neighborhood")
        .data(data.features)
        .join("path")
        .on("click", feature => {
          setSelectedNeighborhood(SelectedNeighborhood === feature ? null : feature);
        })
        .on("mouseenter", mouseEnter)
        .attr("class", "neighborhood")
        .transition()
        .duration(1000)
        .attr("fill", feature => colorScale(feature.properties[property]))
        .attr("d", feature => pathGenerator(feature));

      // render text when clicked in neighborhood
      svg.selectAll(".label").data([SelectedNeighborhood])
        .join("text")
        .attr("class", "label")
        .text(
          feature =>
            feature &&
            feature.properties.name +
              ": " +
              feature.properties[property].toLocaleString()
        )
        .attr("x", 205)
        .attr("y", 25);
    }, [data, dimensions, property, SelectedNeighborhood]);
  
    return (
      <div ref={wrapperMapRef} className="wrapperMap">
        <svg ref={svgMapRef}></svg>
      </div>
    );
  }
export default Map;