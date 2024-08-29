"use server";

export const jsonResponse = (
  data: any,
  headers: ResponseInit["headers"] = {},
  status = 200
) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};
