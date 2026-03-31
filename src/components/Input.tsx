import { useEffect } from "react";
import readInitialInput from "@/utils/read-input";

export const Input: React.FC<{
  data?: string;
  onUpdate: (value: string) => void;
}> = ({ data, onUpdate }) => {
  useEffect(() => {
    const getInitialInput = async () => {
      const initial = await readInitialInput();
      onUpdate(initial.trim() ?? "");
    };

    getInitialInput();
  }, [onUpdate]);

  return (
    <form onSubmit={() => {}}>
      <label>
        Instructions:
        <br />
        <textarea value={data} onChange={() => {}} rows={15} cols={20} />
      </label>
    </form>
  );
};
