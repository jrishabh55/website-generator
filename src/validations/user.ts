import { z } from "zod";
import { claudeSPAResponse } from "@/validations";

export const zUser = z.object({
  username: z.string(),
  websites: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
      layout: claudeSPAResponse,
    })
  ),
});

export type User = z.infer<typeof zUser>;
