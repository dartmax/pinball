import { powerBall } from "../../types";
import { RootState } from "../root-reducer";

const getAllState = (state: RootState): powerBall.State => {
  return state.powerBall;
};

export const pinBallSelectors = {
  getAllState,
};
