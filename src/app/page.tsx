import ThemeToggle from "@/components/ThemeToggle";
import User from "@/components/User";
import db from "@/lib/db";

export const getUserData = async () => {
  return await db.user.findFirst({
    include: {
      Projects: {
        include: {
          links: true,
          techStack: true,
        },
      },
    },
  });
};

export default async function Home() {
  const data = await getUserData();

  if (!data) return;

  return (
    <div>
      <ThemeToggle />
      <div>Nav bar</div>
      <div>Image?</div>
      <User user={data} />
      <div>{data?.summary}</div>
      <div>Skills</div>
      <div>Projects</div>
      <div>Contact Me</div>
    </div>
  );
}
