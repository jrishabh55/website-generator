export const generateText = async (text: string): Promise<{ text: string }> => {
  return fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }).then((res) => res.json());
};
