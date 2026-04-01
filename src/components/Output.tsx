type OutputProps = {
  data: string[];
};

export const Output: React.FC<OutputProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2.5">
      <p>Results:</p>
      <div className="peer h-full min-h-5 w-full resize-none rounded-[7px] border border-gray-400 px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline-0">
        {data.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
};
