"use client";
import { Rating } from "flowbite-react";

type Props = {
  title: string;
};

const HomePage = ({ title }: Props) => {
  return (
    <div>
      <h1>{title} </h1>
      <Rating className="mb-2">
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          4.95 out of 5
        </p>
      </Rating>
      <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        1,745 global ratings
      </p>
      <Rating.Advanced className="mb-2" percentFilled={70}>
        <p>5 star</p>
      </Rating.Advanced>
      <Rating.Advanced className="mb-2" percentFilled={17}>
        <p>4 star</p>
      </Rating.Advanced>
      <Rating.Advanced className="mb-2" percentFilled={8}>
        <p>3 star</p>
      </Rating.Advanced>
      <Rating.Advanced className="mb-2" percentFilled={4}>
        <p>2 star</p>
      </Rating.Advanced>
      <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
    </div>
  );
};

export default HomePage;
