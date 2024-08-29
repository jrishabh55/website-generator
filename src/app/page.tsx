"use client";
import { UserForm } from "@/components/form";
import CreateUserForm from "@/components/UserForm";
import { User } from "@/validations/user";
import { useState } from "react";
import { useFormState } from "react-dom";
import { getInitialLayout, LayoutData } from "./actions";

export default function Home() {
  const [user, setUser] = useState(undefined as unknown as User);

  const [state, action, isPending] = useFormState(
    (_: unknown, formData: FormData) => {
      return getInitialLayout({
        name: formData.get("name") as string,
        keywords: formData.get("keywords") as string,
        username: formData.get("username") as string,
      });
    },
    {
      sections: {},
    } as LayoutData
  );

  return (
    <main className="h-screen p-4 justify-center items-center flex">
      {!user && <CreateUserForm setUser={setUser} />}
      {!!user && <UserForm action={action} username={user.username} />}
    </main>
  );
}
