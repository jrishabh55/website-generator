import * as z from "zod";

export const FaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});
export type Faq = z.infer<typeof FaqSchema>;

export const HeroSchema = z.object({
  heading: z.string(),
  shortDescription: z.string(),
  description: z.string(),
});
export type Hero = z.infer<typeof HeroSchema>;

export const ServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.any().transform(() => ""),
});
export type Service = z.infer<typeof ServiceSchema>;

export const claudeSPAResponse = z.object({
  hero: HeroSchema,
  cta: z.array(z.string()),
  services: z.array(ServiceSchema),
  faq: z.array(FaqSchema),
  website: z.any(),
});

export type ClaudeSPAResponse = z.infer<typeof claudeSPAResponse>;
