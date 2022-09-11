import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response;
  switch (req.method) {
    case "POST":
      const { user } = req.body;

      if (user.password !== user.repeat)
        return res.status(400).send("Passwords do not match");

      delete user.repeat;

      if (!user.password)
        return res.status(400).send("Password is required to create user");

      if (!user.username)
        return res.status(400).send("Username is required to create a user");

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      user.username = user.username.toLowerCase();
      user.email = user.email.toLowerCase();

      try {
        response = await prisma.user.create({
          data: {
            ...user,
            roles: {
              create: {
                roleName: "ROLE_USER",
              },
            },
          },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            username: true,
            email: true,
          },
        });
        return res.status(201).send("User created successfully");
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

    default:
      return res.status(405).send("Method not allowed");
  }
}
