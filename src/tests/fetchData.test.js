const axios = require('axios');
import fetchData from "../hook/fetchData";

jest.mock("axios", () => {
    return {
        get: jest.fn().mockResolvedValue({ data: {} }),
    };
});

describe('fetchData', () => {
    it('should make a GET request and set data', async () => {
        const setData = jest.fn();
        await fetchData('https://api.example.com', setData);
        expect(axios.get).toHaveBeenCalledWith('https://api.example.com', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        expect(setData).toHaveBeenCalledWith({});
    });

    it('should log an error when the request fails', async () => {
        const error = new Error('Request failed');
        axios.get.mockRejectedValueOnce(error);
        console.error = jest.fn();
        await fetchData('https://api.example.com', jest.fn());
        expect(console.error).toHaveBeenCalledWith(error);
    });
});