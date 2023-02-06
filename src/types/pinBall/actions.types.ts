export enum actionsTypes {
  FILTER_DATA = "powerBall/FILTER_DATA",
  RESET_STATE = "powerBall/RESET_STATE",
  MY_LONGITUDE = "powerBall/MY_LONGITUDE",
  MY_LATITUDE = "powerBall/MY_LATITUDE",

}

export type Actions =
  | SetFilterData;

export interface SetFilterData {
  type: actionsTypes.FILTER_DATA;
  payload: Record<string, any>;
}

export interface SetMyLongitude {
  type: actionsTypes.MY_LONGITUDE;
  payload: string;
}
export interface SetMyLatitude {
  type: actionsTypes.MY_LATITUDE;
  payload: string;
}

export interface ResetPowerBallState {
  type: actionsTypes.RESET_STATE;
}
