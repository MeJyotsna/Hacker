import React from "react";
import Enzyme, { mount } from "enzyme";
// const Enzyme = require("enzyme");
// const mount = require("enzyme/mount");
import Adapter from "enzyme-adapter-react-16";
// const Adapter = require("enzyme-adapter-react-16");
// const HomeComponent = require("../components/Home");
import { Provider } from "react-redux";
import "chart.js";
import store from "../Store";
import HomeComponent from "../components/Home";

Enzyme.configure({ adapter: new Adapter() });
describe("<HomeComponent />", () => {
  it("should dispatch sample action", () => {
    const wrapper = mount(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
    expect(wrapper.find("tbody")).toHaveLength(1);
  });
});
