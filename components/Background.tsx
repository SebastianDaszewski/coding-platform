import Image from "next/legacy/image";

const Background = () => {
  return (
    <Image
      className="mx-auto"
      src="/images/background.jpg"
      alt="Background"
      layout="fill"
      objectFit="cover"
    />
  );
};

export default Background;
