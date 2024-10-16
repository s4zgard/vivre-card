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

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.addTopic, { errors: {} });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your Topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors._form && (
              <div className="p-2 bg-red-200 border border-red-500 text-red-600 rounded-md">
                {formState.errors._form}
              </div>
            )}
            <Button type="submit" color="success">
              Create
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
