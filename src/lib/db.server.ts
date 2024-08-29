"use server";

import { ClaudeSPAResponse } from "@/validations";
import mongoose, { Schema } from "mongoose";
import { Jsonify } from "./utils";

const websiteSchema = new Schema({
  name: String,
  keywords: String,
  layout: Object,
});
const schema = new Schema({
  username: String,
  websites: [websiteSchema],
});

const userModalFn = () => mongoose.model("User", schema);
export const UserModal: ReturnType<typeof userModalFn> =
  mongoose.models.User || userModalFn();

export const createOrGetUser = async ({ username }: { username: string }) => {
  const data = await UserModal.findOne({ username });
  if (!data) {
    const user = new UserModal({ username, websites: [] });
    await user.save();
    return user.toJSON();
  }

  return data?.toJSON();
};

export type WebsiteRes = {
  sections: {
    hero: number;
    service: number;
    faq: number;
  };
  meta: ClaudeSPAResponse;
  images: {
    hero: string;
    faqs: string[];
    services: string[];
  };
};

export const createWebsite = async (
  username: string,
  website: { name: string; keywords: string; layout: WebsiteRes }
) => {
  const user = await UserModal.findOneAndUpdate(
    { username },
    {
      $push: {
        websites: website,
      },
    },
    { new: true }
  );
  const websiteRes = user?.websites.pop();
  return JSON.parse(JSON.stringify(websiteRes));
};

export const updateWebsite = async (
  id: string,
  data: Record<string, string>
) => {
  const updateSet = Object.entries(data).reduce((acc, [key, value]) => {
    if (key.startsWith("^")) {
      acc[`websites.$.layout.${key.replace("^", "")}`] = value;
      return acc;
    }
    acc[`websites.$.layout.meta.${key}`] = value;
    return acc;
  }, {} as Record<string, string>);

  const user = await UserModal.findOneAndUpdate(
    { "websites._id": id },
    {
      $set: updateSet,
    },
    { new: true }
  );

  const website = user?.websites.find(
    (website) => website._id.toString() === id
  );

  return Jsonify(website);
};
