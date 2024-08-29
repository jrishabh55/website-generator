"use client";
import { UserForm } from "@/components/form";
import Layout from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormState } from "react-dom";
import { getInitialLayout, LayoutData } from "./actions";
import { useOptimistic } from "react";

export default function Home() {
  const [state, action, isPending] = useFormState(
    (_: unknown, formData: FormData) => {
      return getInitialLayout({
        name: formData.get("name") as string,
        keywords: formData.get("keywords") as string,
      });
    },
    {
      data: {
        sections: {},
      },
    } as LayoutData
  );

  return (
    <main className="flex gap-2 flex-col h-screen">
      <header className="flex justify-center shadow-md py-2">
        <UserForm action={action} />
      </header>
      <main className="flex-grow flex justify-center flex-col items-center">
        {!isPending && (
          <Layout
            sections={state.data.sections}
            meta={state.data.meta}
            images={state.data.images}
          />
        )}
      </main>
    </main>
  );
}
