"use server";
import Anthropic from "@anthropic-ai/sdk";
import { getRandomNumber, wait } from "@/lib/utils";
import { claudeSPAResponse } from "@/validations";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";
import { createApi } from "unsplash-js";
import { services } from "@/components/services";

type InputArgs = {
  name: string;
  keywords: string;
};

export const getInitialLayout = async (
  { name, keywords } = {} as InputArgs
) => {
  console.log({ name, keywords });
  const sectionData = await initialAPICall({ name, keywords });

  const responseData = {
    data: {
      sections: {
        hero: getRandomNumber(2),
        service: getRandomNumber(2),
        faq: getRandomNumber(2),
      },
      meta: sectionData,
      images: {
        hero: await getImage(keywords),
        faqs: await Promise.all(
          sectionData.faq.map(async (faq) => await getImage(faq.question))
        ),
        services: await Promise.all(
          sectionData.services.map(
            async (service) => await getImage(service.name)
          )
        ),
      },
    },
  };

  return responseData;
};

export type LayoutData = Awaited<ReturnType<typeof getInitialLayout>>;

export const initialAPICall = async ({ name, keywords }: InputArgs) => {
  const anthropic = new Anthropic();

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    temperature: 0,
    system:
      'Your task is to create a one-page website based on the given specifications, delivered in JSON format with keys "hero" (heading shortDescription, description), "cta" (2 call to actions as text), 6 - 10 "services" (name, description, "icon" icon is an HTML unicode icon related to the description), and "faq" (list of dict with "question", "answer")\n\nDo not include any other values in the JSON',
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `name: ${name}\nkeywords: ${keywords}`,
          },
        ],
      },
    ],
  });

  return claudeSPAResponse.parse(
    JSON.parse((msg.content[0] as TextBlock).text)
  );
};

export const getImage = async (keywords: string) => {
  return "https://picsum.photos/1800";

  // getImages(keywords, 1).then((images) => images[0]);
};

export const getImages = async (keywords: string, count = 1) => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_RJ!,
  });

  const data = await unsplash.photos.getRandom({
    query: keywords,
    count,
  });

  if (!data.response) throw new Error("No response from Unsplash API");

  const responses = data.response;
  if (Array.isArray(responses)) {
    return responses.map((item) => item.urls.full);
  }

  return [responses.urls.full];
};
