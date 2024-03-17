import React, { FC } from "react";
import { Argos } from "react-argos";
import { useArgos } from "../../hooks/useArgos";

const Dashboard: FC = () => {
  const {
    addNextNumber,
    completeNumber,
    deleteNumber,
    iterator,
    ready,
    processing,
  } = useArgos();

  return (
    <section>
      <h2>dashboard</h2>
      <dl>
        <dt>next number</dt>
        <dd>
          <button onClick={() => addNextNumber()}>{iterator}</button>
        </dd>
        <dt>processing</dt>
        <dd>
          {processing.map((x) => (
            <button key={x} onClick={() => completeNumber(x)}>
              {x}
            </button>
          ))}
        </dd>
        <dt>ready</dt>
        <dd>
          {ready.map((x) => (
            <button key={x} onClick={() => deleteNumber(x)}>
              {x}
            </button>
          ))}
        </dd>
      </dl>
    </section>
  );
};

export { Dashboard };
