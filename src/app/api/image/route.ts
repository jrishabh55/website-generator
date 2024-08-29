import { jsonResponse } from "@/lib/utils.server";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const width = params.get("width") || 100;
  const height = params.get("height") || 100;
  return jsonResponse({
    image: await fetch(`https://picsum.photos/${width}/${height}`).then(
      (res) => res.url
    ),
  });
};
