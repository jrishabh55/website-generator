import { getWebsites } from "@/app/actions";
import Link from "next/link";
import { FC } from "react";
import { Card } from "./ui/card";

const Websites: FC<{ username: string }> = async ({ username }) => {
  const websites = await getWebsites(username);

  if (!websites) {
    return null;
  }

  return (
    <Card className="flex flex-col gap-y-4 p-4 w-60">
      <h1>Existing Websites</h1>
      <ul className="list-disc ml-4">
        {websites.map((website) => (
          <li key={website._id.toString()}>
            <Link target="_blank" href={`/preview/${website._id}`}>
              {website.name}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Websites;
