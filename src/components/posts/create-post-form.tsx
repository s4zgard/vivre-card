"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";

interface CreatePostProps {
  slug: string;
}

export default function CreatePostForm({ slug }: CreatePostProps) {
  const [formState, action] = useFormState(actions.addPost.bind(null, slug), {
    errors: {},
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Add Post</h3>
            <Input
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title}
              placeholder="Title goes here"
              name="title"
              label="Title"
              labelPlacement="outside"
            />
            <Textarea
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content}
              name="content"
              placeholder="What's on your mind......"
              label="Content"
              labelPlacement="outside"
            />
            {formState.errors._form && (
              <div className="p-2 bg-red-200 border border-red-500 text-red-600 rounded-md">
                {formState.errors._form}
              </div>
            )}
            <FormButton>Add Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
