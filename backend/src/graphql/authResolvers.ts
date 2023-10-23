import { User } from "../types/user";
import { GraphQLError } from "graphql/error";
import bcrypt from "bcrypt";
import { createUser, getUser } from "../db";
import jwt from "jsonwebtoken";

export async function registerResolver(parent: any, user: User) {
  const { username, password } = user;

  if (!username || !password) {
    throw new GraphQLError("Missing fields");
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    throw new GraphQLError("Couldn't create user");
  }

  try {
    if (!hashedPassword) {
      throw new Error();
    }
    const userId = await createUser(username, hashedPassword);
    if (process.env.JWT_SECRET) {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      return { username, token };
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new GraphQLError("Couldn't create user");
  }
}
export async function loginResolver(parent: any, user: User) {
  const { username, password } = user;
  if (!username || !password) {
    throw new GraphQLError("Missing fields");
  }
  //
  let dbUser = await getUser(username);

  if (!dbUser) {
    throw new GraphQLError("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, dbUser.password);

  if (!passwordMatch) {
    throw new GraphQLError("Invalid credentials");
  }

  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ userId: dbUser.id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    return { token };
  } else {
    throw new GraphQLError("Error");
  }
}
