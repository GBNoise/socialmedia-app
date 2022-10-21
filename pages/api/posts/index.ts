import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { post } = req.body;
  const token = (await getToken({ req })) as any;
  if (!token) return res.status(403).send("You are not authenticated");
  switch (req.method) {
    case "GET":
      return getAll()
        .then((data) => res.status(200).send(data))
        .catch((e) => {
          console.log({ e });
          return res.status(500).send(e);
        });

    case "POST":
      return createPost(post)
        .then((data) => res.status(201).send(data))
        .catch((e) => res.status(500).send(e));

    case "PUT":
      return updatePost(post)
        .then((data) => res.status(200).send(data))
        .catch((e) => res.status(500).send(e));

    case "DELETE":
      return deletePost(post, token.id)
        .then((data) => res.status(200).send(data))
        .catch((e) => {
          if (e === "Unauthorized") return res.status(403).send(e);
          else return res.status(500).send(e);
        });
  }
}

const getAll = async () => {
  try {
    return await prisma.post.findMany({
      where: {
        NOT: {
          owner: {
            username: { in: [""] },
          },
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

const createPost = async ({ content, ownerID }: any) => {
  try {
    return await prisma.post.create({
      data: {
        content,
        owner: {
          connect: {
            id: ownerID,
          },
        },
      },
    });
  } catch (e) {
    return Promise.reject("Could not create a post " + JSON.stringify(e));
  }
};

const updatePost = async ({ postID, content, userID, liked, saved }: any) => {
  const data = {} as any;
  if (content) data.content = content;

  if (userID && !content) {
    if (liked) data.likedBy = { disconnect: { id: userID } };
    if (saved) data.savedBy = { disconnect: { id: userID } };

    if (liked !== undefined && !liked)
      data.likedBy = { connect: { id: userID } };
    if (saved !== undefined && !saved)
      data.savedBy = { connect: { id: userID } };
  }

  try {
    return await prisma.post.update({
      where: {
        id: parseInt(postID),
      },
      data,
    });
  } catch (e) {
    Promise.reject(e);
  }
};

const getSinglePost = async (postID: number) => {
  try {
    return await prisma.post.findUnique({
      where: { id: postID },
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
      },
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

const deletePost = async ({ id }: any, ownerID: string) => {
  try {
    const post = await getSinglePost(id);
    if (post?.owner.id !== ownerID) return Promise.reject("Unauthorized");

    return await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
