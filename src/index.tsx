import { Argos } from "./components/Argos";
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

ReactDOM.render(
  <Argos
    data={{
      ready: [467, 453, 455, 457],
      processing: [345, 346, 347, 348, 349, 350, 351, 352, 353],
    }}
  />,
  document.getElementById("root")
);
