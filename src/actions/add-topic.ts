"use server";

import { auth } from "@/auth";
import { z } from "zod";
import type { Topic } from "@prisma/client";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { paths } from "@/paths";

const topicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: "Must be lowercase or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface TopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function addTopic(
  formState: TopicFormState,
  formData: FormData
): Promise<TopicFormState> {
  const result = topicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session || !session.user) {
    return { errors: { _form: ["You are not signed in."] } };
  }

  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return { errors: { _form: ["Something went wrong."] } };
    }
  }

  revalidatePath("/");
  redirect(paths.showTopic(topic.slug));
}
