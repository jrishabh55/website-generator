import { jsonResponse } from "@/lib/utils.server";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";
import { NextRequest } from "next/server";

export const POST = async (request: Request) => {
  const { text } = await request.json();

  const anthropic = new Anthropic();

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    temperature: 0,
    system:
      "rephrase the text keeping the key items same making sure its grammatically correct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      },
    ],
  });

  return jsonResponse({
    text: (msg.content[0] as TextBlock).text,
  });
};
