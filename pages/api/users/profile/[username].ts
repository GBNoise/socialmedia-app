import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).send("Method not supported");
  const { username } = req.query;
  if (typeof username !== "string") return;

  const profile = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      profile: true,
    },
  });

  if (!profile) return res.status(404).send("Profile not found");

  return res.status(200).send(profile);
}
