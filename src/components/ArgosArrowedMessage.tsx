import React, { ReactNode } from "react";
import { Mode } from "../type/Mode";
import classNames from "classnames";
import { UpArrow } from "./UpArrow";

interface ArgosMessagebarProps {
  mode: Mode;
  children: ReactNode;
}

const ArgosMessagebar = ({ mode, children }: ArgosMessagebarProps) => {
  return (
    <div className={classNames("argos-messagebar", mode)}>
      <UpArrow />
      <div className="argos-messagebar-message">{children}</div>
      <UpArrow />
    </div>
  );
};

export { ArgosMessagebar };
