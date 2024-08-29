import { getWebsite } from "@/app/actions";
import Layout from "@/components/Layout";
import { useState } from "react";

const WebsitePreview = async ({ params }: { params: { id: string } }) => {
  const state = await getWebsite(params.id);
  if (!state.layout) {
    throw new Error("No layout found");
  }

  return (
    <Layout
      sections={state.layout.sections}
      meta={state.layout.meta}
      images={state.layout.images}
    />
  );
};

export default WebsitePreview;
