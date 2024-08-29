"use client";

import { FC, FormHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const UserForm: FC<FormHTMLAttributes<HTMLFormElement>> = ({
  action,
}) => {
  return (
    <form action={action} className="flex gap-2">
      <Input placeholder="Product Name" name="name" />
      <Input placeholder="Keywords (Comma Sep)" name="keywords" />
      <Button type="submit">Create page</Button>
    </form>
  );
};
