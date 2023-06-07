import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, author, read, thoughts } = req.body;

  const session = await getSession({ req });
  const result = await prisma.book.create({
    data: {
      title: title,
      author: author,
      read: read,
      thoughts: thoughts,
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
