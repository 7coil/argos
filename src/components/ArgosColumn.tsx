import React, { ReactNode } from "react";

interface ArgosColumnProps {
  children: ReactNode;
}

const ArgosColumn: React.FC<ArgosColumnProps> = ({ children }) => {
  return <div className="argos-column">{children}</div>;
};

export { ArgosColumn };
