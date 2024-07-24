import { Response, Request } from "express";
import { messageService } from "../services";
import { z } from "zod";

class MessageController {
  async text(request: Request, response: Response) {
    const { text, number } = request.body;
    const { identificadornumero, identificadorconta, token } = request.headers;
    const messageSchena = z.object({
      text: z.string(),
      number: z.string(),
      identificadornumero: z.string(),
      identificadorconta: z.string(),
      token: z.string(),
    });

    const message = messageSchena.parse({
      text,
      number,
      identificadornumero,
      identificadorconta,
      token,
    });

    try {
      const res = await messageService.text(message);
      return response.status(200).send({res});
    } catch (error) {
          return response.status(500).send({
        error: "falha no envio da mensagem de texto.",
        message: error,
      });
    }
  }

  async document(request: Request, response: Response) {
    console.log(request);
    let filename, mimetype;
    const { text, number, caption } = request.body;
    const { identificadornumero, identificadorconta, token } = request.headers;
    if (
      (request.file && request.file.filename) &&
      (request.file && request.file.mimetype)
    ) {
      filename = request.file.filename;
      mimetype = request.file.mimetype;
    }

    const messageSchena = z.object({
      number: z.string(),
      identificadornumero: z.string(),
      identificadorconta: z.string(),
      token: z.string(),
      filename: z.string(),
      mimetype: z.string(),
      caption: z.string(),
    });

    const message = messageSchena.parse({
      text,
      number,
      identificadornumero,
      identificadorconta,
      token,
      filename,
      mimetype,
      caption,
    });

    try {
      const res = await messageService.document(message);
      return response.status(200).send(res);
    } catch (error) {
      return response.status(500).send({
        error: "falha no envio da mensagem de texto.",
        message: error,
      });
    }
  }
}

export const messageController = new MessageController();
