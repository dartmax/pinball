import { powerBall as types } from "../../types";
import * as actions from "../../types/powerBall/actions.types";

export const filteredDataActions = (
  payload: types.State["filteredData"]
): actions.SetFilterData => ({
  type: types.actionsTypes.FILTER_DATA,
  payload,
});

export const resetPowerBallState =
  (): actions.ResetPowerBallState => ({
    type: types.actionsTypes.RESET_STATE,
  });
