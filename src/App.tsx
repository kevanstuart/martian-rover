import { useCallback, useEffect, useState } from "react";
import "./app.css";
import { Input } from "./components/Input";
import Engine from "./lib/engine";
import parseInput from "./utils/parse-input";

export const Application: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleSetInput = useCallback((newInput: string) => {
    setInput(newInput);
  }, []);

  useEffect(() => {
    const parsed = parseInput(input);
    if (parsed.length) {
      // const engine =
      new Engine(parsed);
    }
  }, [input]);

  return (
    <section id="center">
      <Input data={input} onUpdate={handleSetInput} />
    </section>
  );
};
