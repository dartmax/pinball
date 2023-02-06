import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../store/root-reducer";
import { logger } from "redux-logger";

const actionSanitizer = (action: Record<string, any>) =>
  action.type.includes("LONG_BLOB") && action.payload
    ? { ...action, payload: "<<LONG_BLOB>>" }
    : action;

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const composeEnhancers =
      //@ts-ignore
      // eslint-disable-next-line no-restricted-globals
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // add sanitizers here as devtools options
        // see https://github.com/zalmoxisus/redux-devtools-extension/tree/94f7e53800f4665bddc9b7438c5cc75cfb4547cc#12-advanced-store-setup
        // section 1.2
        actionSanitizer,
        stateSanitizer: (state: Record<string, any>) => state,
      }) || compose;
    return composeEnhancers(applyMiddleware(...middleware, logger));
  }
  return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, bindMiddleware([thunkMiddleware]));
// @ts-ignore
window.__state__ = store;
export default store;
