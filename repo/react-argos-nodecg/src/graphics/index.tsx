import { Argos } from "react-argos";
import "react-argos/dist/main.css";

import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <Argos
    data={{
      ready: [467, 453, 455, 999],
      processing: [345, 346, 347, 348, 349, 350, 351, 352, 353],
    }}
  />,
  document.getElementById("root")
);
