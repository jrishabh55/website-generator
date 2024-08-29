"use client";

import { FC, FormHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const UserForm: FC<
  FormHTMLAttributes<HTMLFormElement> & { username?: string }
> = ({ action, username }) => {
  return (
    <form action={action} className="flex gap-2">
      <Input placeholder="Product Name" name="name" />
      <Input placeholder="Keywords (Comma Sep)" name="keywords" />
      {!!username && <Input value={username} name="username" type="hidden" />}
      <Button type="submit">Create page</Button>
    </form>
  );
};
