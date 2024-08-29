"use client";
import { UserForm } from "@/components/form";
import CreateUserForm from "@/components/UserForm";
import { User } from "@/validations/user";
import { useState } from "react";

export const maxDuration = 60; // Applies to the actions

export default function Home() {
  const [user, setUser] = useState(undefined as unknown as User);

  return (
    <main className="h-screen p-4 justify-center items-center flex">
      {!user && <CreateUserForm setUser={setUser} />}
      {!!user && <UserForm username={user.username} />}
    </main>
  );
}
