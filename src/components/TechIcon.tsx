import React from "react";

type Props = {
  path: string;
};

const TechIcon = ({ path }: Props) => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d={path} />
    </svg>
  );
};

export default TechIcon;
