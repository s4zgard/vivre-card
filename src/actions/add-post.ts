"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface PostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function addPost(
  slug: string,
  formState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const result = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session || !session.user) {
    return { errors: { _form: ["You are not signed in."] } };
  }

  const topic = await db.topic.findFirst({ where: { slug } });

  if (!topic) return { errors: { _form: ["Topic not found"] } };

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath(paths.showTopic(slug));
  redirect(paths.showPost(slug, post.id));
}
