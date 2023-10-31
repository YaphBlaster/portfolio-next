import ThemeToggle from "@/components/ThemeToggle";
import Portfolio from "@/components/Portfolio";
import { dbUtils } from "@/lib/db";
import AdminSheet from "@/components/AdminSheet";

export default async function Home() {
  const data = await dbUtils.getPageOwner({});

  if (!data) return;

  return (
    <div>
      <ThemeToggle />
      <AdminSheet />
      <div>Nav bar</div>
      {/* <div>Image?</div> */}
      <Portfolio />
      {/* <div>{data?.summary}</div>
      <div>Skills</div>
      <div>Projects</div>
      <div>Contact Me</div> */}
    </div>
  );
}
