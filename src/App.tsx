import React from 'react';
import './index.scss';
import Header from "./components/header/Header";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./store/root-reducer";
import PowerBallMap from "./components/powerBallMap/PowerBallMap";

function App() {
  return (
    <div className="App">
      <Header />
        <div className="App-header">
          <PowerBallMap />
        </div>
    </div>
  );
}


const AppWrapper = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper;
