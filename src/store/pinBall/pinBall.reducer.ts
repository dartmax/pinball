import { powerBall as types } from "../../types";
import produce from "immer";

export const initialValue: types.State = {
  filteredData: null,
  myLongitude: "",
  myLatitude: "",
};

const reducer = (state = initialValue, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case types.actionsTypes.FILTER_DATA:
      return produce(state, (draft) => {
        draft.filteredData = action.payload;
      });

    case types.actionsTypes.MY_LONGITUDE:
      return produce(state, (draft) => {
        draft.myLongitude = action.payload;
      });

    case types.actionsTypes.MY_LATITUDE:
      return produce(state, (draft) => {
        draft.myLatitude = action.payload;
      });

    case types.actionsTypes.RESET_STATE:
      return { ...initialValue };

    default:
      return state;
  }
};

export default reducer;
