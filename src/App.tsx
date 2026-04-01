import { useCallback, useState } from "react";
import "./app.css";
import { Input } from "./components/Input";
import { Output } from "./components/Output";
import Engine from "./lib/engine";
import parseInput from "./utils/parse-input";

export const Application: React.FC = () => {
  const [output, setOutput] = useState<string[]>([]);

  const handleSendOutput = useCallback((result: string) => {
    if (result) {
      setOutput((output) => {
        const updated = [...output];
        updated.push(result);
        return updated;
      });
    }
  }, []);

  const handleRunInput = useCallback(
    (instructions: string) => {
      const parsed = parseInput(instructions);
      if (parsed.length) {
        setOutput([]);
        const engine = new Engine(parsed);
        engine.runEngine(handleSendOutput);
      }
    },
    [handleSendOutput],
  );

  return (
    <main className="flex flex-col gap-6 w-full min-h-screen bg-base-200 justify-center items-center">
      <h1 className="text-3xl">Martian Robots - Red Badger </h1>
      <div className="grid grid-cols-2 min-w-2xl max-w-4xl gap-4">
        <Input onRunHandler={handleRunInput} />
        <Output data={output} />
      </div>
    </main>
  );
};
