import { useState } from "react";
import readInitialInput from "@/utils/read-input";

type InputProps = {
  onRunHandler: (instructions: string) => void;
};

export const Input: React.FC<InputProps> = ({ onRunHandler }) => {
  const [data, setData] = useState<string>();

  function runLoadSampleData() {
    const getInitialInput = async () => {
      const input = await readInitialInput();
      setData(input);
    };
    if (!data) getInitialInput();
  }

  function runMartianRobot(formData: FormData) {
    const instructions = formData.get("martian_input") as string;
    if (instructions !== data) setData(instructions);
    onRunHandler(instructions.trim());
  }

  return (
    <form action={runMartianRobot} className="flex flex-col gap-2.5">
      <label htmlFor="martian_input">Instructions:</label>
      <textarea
        id="martian_input"
        name="martian_input"
        defaultValue={data}
        rows={10}
        cols={20}
        className="peer h-full min-h-5 w-full resize-none rounded-[7px] border border-gray-400 px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline-0"
      />
      <button
        type="button"
        onClick={runLoadSampleData}
        className="mt-2.5 w-full rounded-[7px] bg-amber-400 px-3 py-2.5 text-lg text-white uppercase cursor-pointer transition-all shadow-sm hover:bg-amber-500 active:bg-amber-800"
      >
        Load sample data
      </button>
      <button
        type="submit"
        className="mt-2.5 w-full rounded-[7px] bg-amber-400 px-3 py-2.5 text-lg text-white uppercase cursor-pointer transition-all shadow-sm hover:bg-amber-500 active:bg-amber-800"
      >
        Run
      </button>
    </form>
  );
};
