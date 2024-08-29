"use client";
import { UserForm } from "@/components/form";
import { Skeleton } from "@/components/ui/skeleton";
import CreateUserForm from "@/components/UserForm";
import Websites from "@/components/Websites";
import { User } from "@/validations/user";
import { Suspense, useState } from "react";

export const maxDuration = 60; // Applies to the actions

export default function Home() {
  const [user, setUser] = useState(undefined as unknown as User);

  return (
    <main className="h-screen p-4 justify-center items-center flex">
      {!user && <CreateUserForm setUser={setUser} />}

      {!!user && (
        <div className="flex gap-10">
          <Suspense fallback={<Skeleton />}>
            <Websites username={user.username} />
          </Suspense>
          <UserForm username={user.username} />
        </div>
      )}
    </main>
  );
}
