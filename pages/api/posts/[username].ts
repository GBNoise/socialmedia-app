import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;
  if (typeof username !== "string") return;

  switch (req.method) {
    case "GET":
      return await getUserPosts(username)
        .then((data) => res.status(200).send(data))
        .catch((e) => res.status(500).send(e));

    default:
      return res.status(405).send("Invalid method");
  }
}

const getUserPosts = async (username: string) => {
  try {
    return prisma.post.findMany({
      where: {
        owner: {
          username,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        owner: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                picture: true,
              },
            },
          },
        },
        likedBy: {
          select: {
            id: true,
            username: true,
          },
        },
        savedBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
