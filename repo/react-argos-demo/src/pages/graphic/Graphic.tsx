import React, { FC } from "react";
import { Argos } from "react-argos";
import { useArgos } from "../../hooks/useArgos";

const Graphic: FC = () => {
  const { ready, processing } = useArgos();

  return <Argos data={{ ready, processing }} />;
};

export { Graphic };
