import { useCallback, useState } from "react";
import "./app.css";
import { Input } from "./components/Input";
import { Output } from "./components/Output";
import { GITHUB_LINK } from "./config/constants";
import Engine from "./lib/engine";
import parseInput from "./utils/parse-input";

export const Application: React.FC = () => {
  const [output, setOutput] = useState<string[]>([]);

  /**
   * Incredibly basic error handling - this should be handled
   * more gracefully by the UI
   */
  const handleError = useCallback((error: string) => {
    if (error) {
      alert(error);
    }
  }, []);

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
      setOutput([]);

      const parsed = parseInput(instructions);
      const engine = new Engine(parsed, handleError);
      if (!engine.hasError) engine.runEngine(handleSendOutput);
    },
    [handleSendOutput, handleError],
  );

  return (
    <main className="flex flex-col gap-6 w-full min-h-screen bg-base-200 justify-center items-center">
      <h1 className="text-3xl">Martian Robots - Red Badger </h1>
      <div className="grid grid-cols-2 min-w-2xl max-w-4xl gap-4">
        <Input onRunHandler={handleRunInput} />
        <Output data={output} />
      </div>
      <small>
        Created by Kevan Stuart
        <br />
        See the&nbsp;
        <a
          href={GITHUB_LINK}
          target="_blank"
          rel="noopener"
          className="text-amber-400 hover:underline hover:underline-offset-4"
        >
          GitHub Repo
        </a>
      </small>
    </main>
  );
};
