"use client";

type SampleInputAndOutputProps = {
  data?: any[];
  title: string;
};

const SampleInputAndOutput: React.FC<SampleInputAndOutputProps> = ({
  data,
  title,
}) => {
  const formattedData = data?.join(", ");

  return (
    <div className="flex flex-col w-full my-2">
      <div className="text-white flex">{title}</div>
      <div className="text-white flex w-full bg-customLightGray rounded-md shadow-sampleWindowShadow p-2">
        <div className="text-white">{formattedData}</div>
      </div>
    </div>
  );
};

export default SampleInputAndOutput;
