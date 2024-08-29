"use client";

import { createNewWebsite } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, FormHTMLAttributes } from "react";

export const UserForm: FC<
  FormHTMLAttributes<HTMLFormElement> & { username?: string }
> = ({ username }) => {
  return (
    <form action={createNewWebsite} className="flex gap-2">
      <Input placeholder="Product Name" name="name" />
      <Input placeholder="Keywords (Comma Sep)" name="keywords" />
      {!!username && <Input value={username} name="username" type="hidden" />}
      <Button type="submit">Create page</Button>
    </form>
  );
};
