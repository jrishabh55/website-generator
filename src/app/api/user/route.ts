import { createOrGetUser } from "@/lib/db.server";
import { jsonResponse } from "@/lib/utils.server";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

export const POST = async (request: Request) => {
  const { username } = await request.json();

  return jsonResponse({
    user: await createOrGetUser({ username }),
  });
};
