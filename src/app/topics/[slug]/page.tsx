import CreatePostForm from "@/components/posts/create-post-form";
import PostList from "@/components/posts/post-list";
import { getPostsBySlug } from "@/db/queries/posts";

interface ShowProps {
  params: {
    slug: string;
  };
}

export default function Topics({ params }: ShowProps) {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 p-4 gap-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => getPostsBySlug(slug)} />
      </div>
      <div className="col-span-1">
        <CreatePostForm slug={slug} />
      </div>
    </div>
  );
}
