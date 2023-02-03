export enum actionsTypes {
  FILTER_DATA = "powerBall/FILTER_DATA",
  RESET_STATE = "powerBall/RESET_STATE",

}

export type Actions =
  | SetFilterData;

export interface SetFilterData {
  type: actionsTypes.FILTER_DATA;
  payload: any;
}

export interface ResetPowerBallState {
  type: actionsTypes.RESET_STATE;
}
