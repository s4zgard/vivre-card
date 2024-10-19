import { db } from "@/db";
import { paths } from "@/paths";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

export default async function TopicsList() {
  const topics = await db.topic.findMany();
  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.showTopic(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row flex-wrap gap-1">{renderedTopics}</div>;
}
