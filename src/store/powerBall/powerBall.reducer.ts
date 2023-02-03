import { powerBall as types } from "../../types";
import produce from "immer";

export const initialValue: types.State = {
  filteredData: null,
};

const reducer = (state = initialValue, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case types.actionsTypes.FILTER_DATA:
      return produce(state, (draft) => {
        console.log("action.payload", action.payload)
        draft.filteredData = action.payload;
      });

    case types.actionsTypes.RESET_STATE:
      return { ...initialValue };

    default:
      return state;
  }
};

export default reducer;
