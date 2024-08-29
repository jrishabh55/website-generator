import { updateWebsite } from "@/lib/db.server";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const body = await req.json();

  await updateWebsite(id as string, body);

  revalidatePath(`/preview/${id}`);
  redirect(`/preview/${id}`);
};
