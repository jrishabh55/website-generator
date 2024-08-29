import { jsonResponse } from "@/lib/utils.server";

export async function GET(request: Request) {
  return jsonResponse({
    message: "Hello, World!",
  });
}
