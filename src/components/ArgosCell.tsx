import React from "react";
import classNames from "classnames";
import { withMode } from "../hoc/WithMode";

interface ArgosCellProps {
  number?: number;
  mode?: "processing" | "ready";
}

const ArgosCell: React.FC<ArgosCellProps> = ({
  number,
  mode,
}: ArgosCellProps) => {
  return (
    <div
      className={classNames("argos-cell", mode, {
        "argos-cell-empty":
          mode === "processing" && typeof number === "undefined",
      })}
    >
      {number}
    </div>
  );
};

const ArgosProcessingCell = withMode(ArgosCell, "processing");
const ArgosReadyCell = withMode(ArgosCell, "ready");

export { ArgosProcessingCell, ArgosReadyCell };
