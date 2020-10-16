import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";

//import Posts from './components/posts';
//import history from './components/history'
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <CssBaseline />
    <App />
  </Router>,
  rootElement
);
