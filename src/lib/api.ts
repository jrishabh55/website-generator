import { User } from "@/validations/user";

export const generateText = async (text: string): Promise<{ text: string }> => {
  return fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }).then((res) => res.json());
};

export const createUser = async (username: string): Promise<{ user: User }> => {
  return fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  }).then((res) => res.json());
};

export const updateWebsite = async (
  id: string,
  data: Record<string, string>
) => {
  return fetch(`/api/website/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
