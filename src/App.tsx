import React from 'react';
import store from "./config/store";
import {Provider} from "react-redux";

import './index.scss';
import Header from "./components/header/Header";
import PinBallMap from "./components/pinBallMap/PinBallMap";

function App() {
  return (
  <div className="App">
    <Header />
      <div className="App-header">
        <PinBallMap />
      </div>
  </div>
  );
}


const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper;
