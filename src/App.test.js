import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import App from "./App";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// unmount or cleanup after every test
afterEach(cleanup); 

describe("landing page tests", () => {
  it("App renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("H1 rendered on page", () => {
    const { getByText } = render(<App />);
    const mapH1Content = getByText(/Car crashes in Washington D.C. neighborhoods/i);
    
    expect(mapH1Content).toBeInTheDocument();
  });
});

describe("select drop down value when options changed", () => {
  const mapComponentSelect = mount(<App />);
  it("select drop down value should be '2014' if '2014' option selected", () => {
    mapComponentSelect.find(".mapFilter").simulate("change",{target: { value : "2014"}});
    expect(mapComponentSelect.find(".mapFilter").props().value).toBe("2014");    
  });
  it("select drop down value should be '2013' if '2013' option selected", () => {
    mapComponentSelect.find(".mapFilter").simulate("change",{target: { value : "2013"}});
    expect(mapComponentSelect.find(".mapFilter").props().value).toBe("2013");    
  });
  it("select drop down value should be '2012' if '2012' option selected", () => {
    mapComponentSelect.find(".mapFilter").simulate("change",{target: { value : "2012"}});
    expect(mapComponentSelect.find(".mapFilter").props().value).toBe("2012");    
  });
  it("select drop down value should be '2011' if '2011' option selected", () => {
    mapComponentSelect.find(".mapFilter").simulate("change",{target: { value : "2011"}});
    expect(mapComponentSelect.find(".mapFilter").props().value).toBe("2011");    
  });
  it("select drop down value should be '2010' if '2010' option selected", () => {
    mapComponentSelect.find(".mapFilter").simulate("change",{target: { value : "2010"}});
    expect(mapComponentSelect.find(".mapFilter").props().value).toBe("2010");    
  });
  it("select drop down value should be 'total' if 'Total (5 years)' option selected", () => {
    mapComponentSelect.find(".mapFilter").simulate("change",{target: { value : "total"}});
    expect(mapComponentSelect.find(".mapFilter").props().value).toBe("total");    
  });
});
