import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import "chart.js";
import store from "../Store";
import HomeComponent from "../components/Home";
import { fetchNewsFeed, dispatchNewsFeeds } from "../components/Home/actions";

Enzyme.configure({ adapter: new Adapter() });
let wrapper;
describe("When home component is mounted", () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
  });
  it("should check for table", () => {
    wrapper = mount(
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
    expect(wrapper.find("table")).toHaveLength(1);
  });

  it("should check for snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should check for dispatchNewsFeeds function to have 'FETCH_NEWS_FEED'", () => {
    var val = dispatchNewsFeeds({});
    expect(val.type === "FETCH_NEWS_FEED").toBe(true);
  });

  it("should check for action has type and payload property", () => {
    var val = dispatchNewsFeeds({});
    expect(val).toHaveProperty("type");
    expect(val).toHaveProperty("payload");
  });

  it("should check for payload has Id property", () => {
    var val = dispatchNewsFeeds({ id: 1 });
    expect(val.payload.id === 1).toBe(true);
  });
});
