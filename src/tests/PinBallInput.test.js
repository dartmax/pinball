import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PinBallMap from "../components/pinBallMap/PinBallMap";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import AppWrapper from "../App";
describe('Component', () => {
    it('updates lon and lat when handleLonChange and handleLatChange are called', () => {
        const myLongitude = '-122.431297';
        const myLatitude = '37.7749';
        const { getByTestId } = render(
            <PinBallMap myLongitude={myLongitude} myLatitude={myLatitude} />
        );

        const lonInput = getByTestId('lon-input');
        const latInput = getByTestId('lat-input');

        fireEvent.change(lonInput, { target: { value: '-120.431297' } });
        fireEvent.change(latInput, { target: { value: '35.7749' } });

        expect(lonInput.value).toBe('-120.431297');
        expect(latInput.value).toBe('35.7749');
    });

    it('sets lon and lat back to the original values when handleLonChange and handleLatChange are called with an empty string', () => {
        const myLongitude = '-122.431297';
        const myLatitude = '37.7749';
        const { getByTestId } = render(
            <PinBallMap myLongitude={myLongitude} myLatitude={myLatitude} />
        );

        const lonInput = getByTestId('lon-input');
        const latInput = getByTestId('lat-input');

        fireEvent.change(lonInput, { target: { value: '' } });
        fireEvent.change(latInput, { target: { value: '' } });

        expect(lonInput.value).toBe(myLongitude);
        expect(latInput.value).toBe(myLatitude);
    });
});

describe('With React Testing Library', () => {
    const initialState = {output:10}
    const mockStore = configureStore()
    let store,wrapper

    it('Shows "Hello world!"', () => {
        store = mockStore(initialState)
        const { getByText } = render(<Provider store={store}><AppWrapper /></Provider>)

        expect(getByText('PinBall Map')).not.toBeNull()
    })
})