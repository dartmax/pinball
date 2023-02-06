import { powerBall as types } from "../../types";
import * as actions from "../../types/pinBall/actions.types";

export const filteredDataActions = (
  payload: types.State["filteredData"]
): actions.SetFilterData => ({
  type: types.actionsTypes.FILTER_DATA,
  payload,
});

export const setMyLongitude = (
    payload: types.State["myLongitude"]
): actions.SetMyLongitude => ({
    type: types.actionsTypes.MY_LONGITUDE,
    payload,
});

export const setMyLatitude = (
    payload: types.State["myLatitude"]
): actions.SetMyLatitude => ({
    type: types.actionsTypes.MY_LATITUDE,
    payload,
});

export const resetPinBallState =
  (): actions.ResetPowerBallState => ({
    type: types.actionsTypes.RESET_STATE,
  });
