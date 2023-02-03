import { combineReducers } from "redux";
import * as types from "../types";
import powerBallReducer from "./powerBall/powerBall.reducer";

export interface RootState {
  powerBall: types.powerBall.State;

}

export interface RootAction {
  type: "RESET_APP";
}

const appReducer = combineReducers<RootState>({
  powerBall: powerBallReducer,
});

const rootReducer = (
  state: RootState | undefined,
  action: RootAction
): RootState => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
