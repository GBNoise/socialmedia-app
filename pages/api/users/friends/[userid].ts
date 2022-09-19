import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { userid } = req.query;
  if (!userid)
    return res.status(400).send("User id is required to fetch its friends");

  switch (req.method) {
    case "GET":
      return await getAllFriends(userid as string)
        .then((data) => res.status(200).send(data))
        .catch((e) =>
          res.status(500).send(JSON.stringify(e) + " Error ocurred")
        );

    default:
      return res.status(405).send("Method not allowed");
  }
}

const getAllFriends = async function (id: string) {
  try {
    return await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        friends: {
          select: {
            username: true,
            profile: {
              select: {
                picture: true,
              },
            },
          },
        },
      },
    });
  } catch (e: any) {
    return Promise.reject(e.name);
  }
};
