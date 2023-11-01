import React from "react";
import Portfolio from "@/components/Portfolio";
import ThemeToggle from "@/components/ThemeToggle";

type Props = {};

const PageOwnerPage = async ({
  params: { id = [] },
}: {
  params: { id: string[] };
}) => {
  const [pulledValue] = id;
  return (
    <div>
      <ThemeToggle />

      <Portfolio pageOwnerId={pulledValue} />
    </div>
  );
};

export default PageOwnerPage;
