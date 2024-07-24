import * as jwt from "jsonwebtoken";
import * as bcryptjs from "bcryptjs";
import config from "../../config";
import { prisma } from "../database";

export type User = {
  id?: string;
  username: string;
  email: string;
  token?: string;
  password: string;
  firstname: string;
  lastname: string;
  surname?: string;
  roleId?: string;
};

export type UserUpdateInput = {
  id: string;
  username: string;
  email: string;
  token?: string;
  password?: string;
  firstname: string;
  lastname: string;
  surname?: string;
  roleId?: string;
};

class UserService {
  async create(user: User) {
    let password = await bcryptjs.hash(user.password, 8);
    let roleId = user.roleId;
    try {
      if (!user.roleId) {
        const role = await prisma.role.findUnique({
          where: {
            name: "USER",
          },
        });
        if (role) {
          roleId = role.id;
        }
      }
      let res = await prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          password: password,
          roleId: roleId || "",
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async login(data: { email: string; password: string }) {
    const { email, password } = data;
    if (!email) {
      throw new Error("login is required");
    }
    if (!password) {
      throw new Error("o password is required");
    }

    let userDB = await prisma.user.findUnique({ where: { email: email } });

    if (!userDB?.password || !userDB?.email || !userDB?.id) {
      throw new Error("user not found");
    }

    let passwordValid = await bcryptjs.compare(password, userDB.password);

    const token = jwt.sign(
      { id: userDB.id, email: userDB.email },
      config.db.tokenSecret || "",
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );
    if (passwordValid) {
      await prisma.user.update({
        where: { email: email },
        data: { token: token },
      });
      return token;
    } else {
      throw new Error("invalid password");
    }
  }

  async findByToken(token: string) {
    let userDB = await prisma.user.findUnique({
      where: { token: token },
      include: { role: true },
    });

    if (!userDB?.password || !userDB?.email || !userDB?.id) {
      throw new Error("user not found");
    }

    return userDB;
  }

  async findUserById(id: string) {
    if (!id) {
      throw new Error("id is required");
    }
    let userDB = await prisma.user.findUnique({
      where: { id: id },
      include: { role: true },
    });
    if (!userDB?.password || !userDB?.email || !userDB?.id) {
      throw new Error("user not found");
    }
    return userDB;
  }

  async findAll() {
    let userDB = await prisma.user.findMany({
      include: { role: true },
    });
    return userDB;
  }

  async updateUser(user: UserUpdateInput) {
    let userDB = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        roleId: user.roleId,
      },
    });
    return { ...userDB, password: undefined, token: undefined };
  }

  async listRoles() {
    let roles = await prisma.role.findMany();
    return roles;
  }

  async changePassword(data: { id: string; password: string }) {
    let hashPassword = await bcryptjs.hash(data.password, 8);
    try {
      let res = await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          password: hashPassword,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
