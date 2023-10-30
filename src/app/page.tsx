import ThemeToggle from "@/components/ThemeToggle";
import Portfolio from "@/components/Portfolio";
import db from "@/lib/db";

export const getPageOwnerData = async () => {
  return await db.pageOwner.findFirstOrThrow({
    include: {
      projects: {
        include: {
          links: true,
          techStack: true,
        },
      },
    },
  });
};

export default async function Home() {
  const data = await getPageOwnerData();

  if (!data) return;

  return (
    <div>
      <ThemeToggle />
      <div>Nav bar</div>
      {/* <div>Image?</div> */}
      <Portfolio pageOwner={data} />
      {/* <div>{data?.summary}</div>
      <div>Skills</div>
      <div>Projects</div>
      <div>Contact Me</div> */}
    </div>
  );
}
