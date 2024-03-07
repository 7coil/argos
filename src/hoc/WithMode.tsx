import React, { ComponentType } from "react";
import { Mode } from "../type/Mode";

interface WithModeProps {
  mode?: Mode;
}

const withMode =
  <T extends WithModeProps>(WrappedComponent: ComponentType<T>, mode: Mode) =>
  (props: T) =>
    <WrappedComponent {...props} mode={mode} />;

export { withMode };
