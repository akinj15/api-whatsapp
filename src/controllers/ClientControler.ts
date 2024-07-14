import { Response, Request } from "express";
import * as z from "zod";
import { clientService } from "../services";

class ClientController {
  async create(request: Request, response: Response) {
    const clientSchema = z.object({
      name: z.string(),
      email: z.string(),
      identificadornumero: z.string(),
      identificadorconta: z.string(),
      whatsapptoken: z.string(),
    });

    const client = clientSchema.parse(request.body);

    try {
      const res = await clientService.create(client);
      return response.status(201).send(res);
    } catch (error) {
      return response.status(500).send({
        error: "Registrer error",
        message: error,
      });
    }
  }

  async listClients(request: Request, response: Response) {
    try {
      let client = await clientService.findAll();
      return response.status(200).send({ client });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async updateClient(request: Request, response: Response) {
    try {
      const clientSchema = z.object({
        name: z.string(),
        email: z.string(),
        identificadornumero: z.string(),
        identificadorconta: z.string(),
        whatsapptoken: z.string(),
      });

      const client = clientSchema.parse(request.body);

      let clientUpdated = await clientService.updateClient(client);

      return response.status(200).send({ clientUpdated });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async findClientById(request: Request, response: Response) {
    try {
      const paramsSchema = z.number()
      const id = paramsSchema.parse(request.params.id)
      const client = await clientService.findClientById(id);
      return response.status(200).send({ client });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }
}

export const clientController = new ClientController()
