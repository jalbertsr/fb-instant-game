import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import '../lib/Skeleton-2.0.4/css/normalize.css';
import '../lib/Skeleton-2.0.4/css/skeleton.css';
import './styles.css'

import "babel-polyfill";

ReactDOM.render(<App />, document.getElementById("root"));
