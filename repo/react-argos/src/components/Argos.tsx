import React, { useEffect, useMemo, useState } from "react";
import { ArgosProcessingCell, ArgosReadyCell } from "./ArgosCell";
import { ArgosColumn } from "./ArgosColumn";
import { ArgosMessagebar } from "./ArgosArrowedMessage";
import { Mode } from "../type/Mode";

const useTime = () => {
  const [date, setDate] = useState(new Date());
  const [colonVisible, setColonVisible] = useState(false);

  useEffect(() => {
    let animationFrame: ReturnType<typeof requestAnimationFrame> | undefined;

    const animate = () => {
      setDate(new Date());
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColonVisible((x) => !x);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [hour, minute, day] = date
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(/[: ]/);

  return { hour, minute, day, colonVisible };
};

const useScaling = () => {
  const [scaling, setScaling] = useState<{ transform?: string }>({});

  useEffect(() => {
    let animationFrame: ReturnType<typeof requestAnimationFrame> | undefined;

    const animate = () => {
      setScaling({
        transform: `scale(calc(${window.innerWidth} / 800), calc(${window.innerHeight} / 600))`,
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return { scaling };
};

interface ArgosProps {
  data: Record<Mode, number[]>;
}

const useArgos = ({
  data: { ready, processing },
}: ArgosProps): {
  readyRow: (number | undefined)[];
  readyColumns: (number | undefined)[][];
  lastNumber: number | undefined;
} => {
  const READY_LENGTH = 7;
  const PROCESSING_COLUMNS = 7;
  const PROCESSING_ROWS = 5;

  const [offset, setOffset] = useState<number>(0);
  const [positionMap, setPositionMap] = useState<
    Map<number, { i: number; j: number }>
  >(new Map());
  const getPositionArray = () =>
    [...positionMap.entries()]
      .map(([n, pos]) => ({
        n,
        ...pos,
      }))
      .sort((a, b) => a.i - b.i || a.j - b.j);

  const readyBarLength = Math.max(READY_LENGTH, ready.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((x) => (x + 1) % readyBarLength);

      for (const key of positionMap.keys()) {
        if (!processing.includes(key)) positionMap.delete(key);
      }

      for (const n of processing) {
        const positionArray = getPositionArray();
        const curPos = positionMap.get(n);

        if (curPos) {
          // If there is no number above this number, move up 1
          if (
            curPos.j > 0 &&
            !positionArray.some((x) => x.i === curPos.i && x.j === curPos.j - 1)
          ) {
            curPos.j--;
          }
        } else {
          const positionCounts = new Map<number, number>();

          for (let i = 0; i < PROCESSING_COLUMNS; i++) {
            positionCounts.set(i, 0);
          }

          for (let { i } of positionArray) {
            positionCounts.set(i, (positionCounts.get(i) ?? 0) + 1);
          }

          // Find number of numbers in column with least number of numbers in it
          const minCount = Math.min(...positionCounts.values());

          // Find columns where we have this number of numbers
          const columnsWithLeastNumberOfNumbers = [...positionCounts.entries()]
            .filter(([_, count]) => count === minCount)
            .map(([column]) => column);

          // Pick a random column with the least number of numbers
          const i =
            columnsWithLeastNumberOfNumbers[
              Math.floor(Math.random() * columnsWithLeastNumberOfNumbers.length)
            ];

          // Pick a row at the bottom of the screen
          const j = Math.max(PROCESSING_ROWS - 1, positionCounts.get(i) ?? 0);

          positionMap.set(n, {
            i,
            j,
          });
        }
      }

      setPositionMap(new Map(positionMap));
    }, 750);

    return () => {
      clearInterval(interval);
    };
  }, [ready, processing]);

  return useMemo(() => {
    const readyRow: (number | undefined)[] = [];
    const readyColumns: (number | undefined)[][] = [];
    const positionArray = getPositionArray();

    for (let i = 0; i < READY_LENGTH; i++) {
      readyRow.push(ready[(i + offset) % readyBarLength]);
    }

    for (let i = 0; i < PROCESSING_COLUMNS; i++) {
      const readyColumn: (number | undefined)[] = [];

      for (let j = 0; j < PROCESSING_ROWS; j++) {
        readyColumn.push(positionArray.find((x) => x.i === i && x.j === j)?.n);
      }

      readyColumns.push(readyColumn);
    }

    return {
      readyRow,
      readyColumns,
      lastNumber: ready[ready.length - 1],
    };
  }, [offset, readyBarLength]);
};

const Argos: React.FC<ArgosProps> = ({ data }: ArgosProps) => {
  const { readyRow, readyColumns, lastNumber } = useArgos({ data });
  const { hour, minute, day, colonVisible } = useTime();
  const { scaling } = useScaling();

  return (
    <div className="argos">
      <div className="argos-root" style={scaling}>
        <div className="argos-infobar">
          <div className="argos-infobar-text">
            <span>
              Your Receipt shows an
              <br />
              Estimated Collection Time
            </span>
          </div>
          <div className="argos-infobar-time">
            <span>
              {hour}
              <span style={{ visibility: colonVisible ? "visible" : "hidden" }}>
                :
              </span>
              {minute}
              <span> </span>
              {day}
            </span>
          </div>
        </div>
        <div className="argos-scrollbar-container">
          <div className="argos-scrollbar-ready">
            <div className="argos-scrollbar-ready-numbers">
              {readyRow.map((x, i) => (
                <ArgosReadyCell key={i} number={x} />
              ))}
            </div>
            <ArgosMessagebar mode="ready">
              Orders above are ready now
            </ArgosMessagebar>
          </div>
          <div className="argos-scrollbar-ready-box">
            <div className="argos-scrollbar-ready-box-header">Last #</div>
            <div className="argos-scrollbar-ready-box-number">{lastNumber}</div>
          </div>
        </div>
        <div className="argos-loading-container">
          {readyColumns.map((readyColumn, i) => (
            <ArgosColumn key={i}>
              {readyColumn.map((n, j) => (
                <ArgosProcessingCell key={j} number={n} />
              ))}
            </ArgosColumn>
          ))}
        </div>
        <ArgosMessagebar mode="processing">
          These orders are being processed
        </ArgosMessagebar>
      </div>
    </div>
  );
};

export { Argos };
