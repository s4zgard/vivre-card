import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending} color="secondary">
      {children}
    </Button>
  );
}
