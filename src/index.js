import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "./components/App";
import reducers from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
