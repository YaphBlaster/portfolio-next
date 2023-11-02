import { useIsDarkTheme } from "@/lib/hooks";
import { Tech } from "@prisma/client";
import React from "react";

type Props = {
  techInfo: Tech;
};

const TechIcon = ({ techInfo: { path, title } }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-28 h-28 relative">
        <svg
          className="techIconSvg absolute fill-primary"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path} />
        </svg>
      </div>

      <div>{title}</div>
    </div>
  );
};

export default TechIcon;
