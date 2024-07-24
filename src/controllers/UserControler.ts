import { Response, Request } from "express";
import { userService } from "../services";
import * as z from "zod";

class UserController {
  async create(request: Request, response: Response) {
    const body = request.body;
    const userSchema = z.object({
      username: z.string(),
      email: z.string(),
      firstname: z.string(),
      lastname: z.string(),
      password: z.string(),
    });
    const user = userSchema.parse(body);
    try {
      const res = await userService.create(user);
      return response.status(201).send(res);
    } catch (error) {
      return response.status(500).send({
        error: "Registrer error",
        message: error,
      });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      if (!email) {
        throw new Error("login is required");
      }
      if (!password) {
        throw new Error("o password is required");
      }

      let token = await userService.login({ email, password });
      return response.status(200).send({ token: token });
    } catch (e) {
      return response.status(403).send({ error: e });
    }
  }

  async whoAmI(request: Request, response: Response) {
    try {
      let { authorization } = request.headers;
      console.log(request.headers);
      if (!authorization) {
        throw new Error("autorization is required.");
      }
      let token = authorization.split(" ")[1];
      if (!token) {
        throw new Error("token unformed.");
      }
      let user = await userService.findByToken(token);

      return response.status(200).send({ user });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async listUsers(request: Request, response: Response) {
    try {
      let user = await userService.findAll();
      return response.status(200).send({ user });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async updateUser(request: Request, response: Response) {
    try {
      const userSchema = z.object({
        id: z.string(),
        roleId: z.string(),
        email: z.string(),
        username: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        surname: z.string(),
      });
      const user = userSchema.parse(request.body);

      let userDb = await userService.updateUser(user);

      return response.status(200).send({ userDb });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async findUserById(request: Request, response: Response) {
    try {
      const id = request.params.id;

      if (!id) {
        throw { message: "id is required." };
      }
      let user = await userService.findUserById(id);

      return response.status(200).send({ user });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async listRoles(request: Request, response: Response) {
    try {
      console.log(1111);
      let roles = await userService.listRoles();
      return response.status(200).send(roles);
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async changePassword(request: Request, response: Response) {
    try {
      const body = request.body;
      const userSchema = z.object({
        id: z.string(),
        password: z.string(),
      });
      const user = userSchema.parse(body);
      const res = await userService.changePassword(user);

      if (!res || !res.id) {
        throw { error: "Falha na atualização do password" };
      }
      return response.status(200).send({ res: "password was updated." });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }
}

export const userController = new UserController();
