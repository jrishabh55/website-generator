"use server";
import { createWebsite, UserModal, WebsiteRes } from "@/lib/db.server";
import { getRandomNumber, Jsonify } from "@/lib/utils";
import { claudeSPAResponse } from "@/validations";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createApi } from "unsplash-js";

type InputArgs = {
  name: string;
  keywords: string;
};

export const getInitialLayout = async (
  { name, keywords, username } = {} as InputArgs & { username: string }
) => {
  const sectionData = await initialAPICall({ name, keywords });

  const responseData: WebsiteRes = {
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
  };

  const website = await createWebsite(username, {
    name,
    keywords,
    layout: responseData,
  });

  revalidatePath(`/preview/${website._id}`);
  redirect(`/preview/${website._id}`);
};

export type LayoutData = WebsiteRes;

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

export const getWebsite = async (id: string, username?: string) => {
  const websites = await UserModal.findOne(
    {
      "websites._id": id,
      ...(username ? { username } : {}),
    },
    {
      "websites.$": 1,
    }
  );
  return Jsonify(websites?.websites[0].toObject());
};
