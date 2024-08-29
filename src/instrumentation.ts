import dbConnect from "./lib/connect";

export async function register() {
  await dbConnect();
}
