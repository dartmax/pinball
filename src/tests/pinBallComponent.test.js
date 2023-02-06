import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PinBallMap from "../components/pinBallMap/PinBallMap";
import {
    resetPinBallState,
    setMyLatitude,
    setMyLongitude
} from "../store/pinBall/pinBall.actions";

describe("PinBallMap component", () => {
    let wrapper;
    let mockStore;
    const initialState = {
        pinBall: {
            filteredData: [],
            myLatitude: "",
            myLongitude: ""
        }
    };

    beforeEach(() => {
        mockStore = configureStore();
        const store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <PinBallMap />
            </Provider>
        );
    });

    it("should render the component", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("should have a form", () => {
        expect(wrapper.find("form").length).toEqual(1);
    });

    it("should have two inputs", () => {
        expect(wrapper.find("input").length).toEqual(3);
    });

    it("should have two buttons", () => {
        expect(wrapper.find("button").length).toEqual(2);
    });

    it("should dispatch setMyLatitude action", () => {
        const store = mockStore(initialState);
        const latitude = "45";
        store.dispatch(setMyLatitude(latitude));
        const actions = store.getActions();
        const expectedPayload = { type: "SET_MY_LATITUDE", payload: latitude };
        expect(actions).toEqual([expectedPayload]);
    });

    it("should dispatch setMyLongitude action", () => {
        const store = mockStore(initialState);
        const longitude = "45";
        store.dispatch(setMyLongitude(longitude));
        const actions = store.getActions();
        const expectedPayload = { type: "SET_MY_LONGITUDE", payload: longitude };
        expect(actions).toEqual([expectedPayload]);
    });

    it("should dispatch resetPinBallState action", () => {
        const store = mockStore(initialState);
        store.dispatch(resetPinBallState());
        const actions = store.getActions();
        const expectedPayload = { type: "RESET_PIN_BALL_STATE" };
        expect(actions).toEqual([expectedPayload]);
    });
});