import { useLocalStorage } from "usehooks-ts";
import { Dispatch, SetStateAction } from "react";

const useMyState = <T>(channel: string, initialState: T) => {
  const [local, setLocal] = useLocalStorage<T>(channel, initialState);

  const set = (state: T) => {
    setLocal(state);
  };

  return [local, setLocal] as [T, Dispatch<SetStateAction<T>>];
};

const useArgos = () => {
  const [iterator, setIterator] = useMyState<number>("iterator", 0);
  const [ready, setReady] = useMyState<number[]>("ready", []);
  const [processing, setProcessing] = useMyState<number[]>("processing", []);

  const addNextNumber = () => {
    setProcessing([...processing, iterator]);
    setIterator(iterator + 1);
  };

  const completeNumber = (n: number) => {
    setProcessing([...new Set(processing.filter((x) => x !== n))]);
    setReady([...new Set([...ready, n])]);
  };

  const deleteNumber = (n: number) => {
    setProcessing([...new Set(processing.filter((x) => x !== n))]);
    setReady([...new Set(ready.filter((x) => x !== n))]);
  };

  return {
    addNextNumber,
    completeNumber,
    deleteNumber,
    iterator,
    ready,
    processing,
  };
};

export { useArgos };
