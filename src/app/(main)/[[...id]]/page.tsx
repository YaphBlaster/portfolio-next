import React from "react";
import Portfolio from "@/components/Portfolio";
import ThemeToggle from "@/components/ThemeToggle";
import { _PageOwnerFullType, getPageOwner } from "@/lib/actions";

type Props = {};

const PageOwnerPage = async ({
  params: { id = [] },
}: {
  params: { id: string[] };
}) => {
  const [pulledValue] = id;
  const data = (await getPageOwner({
    id: pulledValue,
  })) as _PageOwnerFullType;
  console.log("🚀 ~ file: page.tsx:17 ~ data:", data);

  if (!data) return;

  return (
    <div>
      <ThemeToggle />
      <Portfolio pageOwnerId={pulledValue} data={data} />
    </div>
  );
};

export default PageOwnerPage;
