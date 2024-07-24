import { Response, Request } from "express";
import { prisma } from '../database';
import { z } from "zod";

export default async (req: Request, res: Response, next: any) => {
  const authorizationSchema = z.object({
    identificadornumero: z.string(),
    identificadorconta: z.string(),
  });
  const authorization = authorizationSchema.parse(req.headers);
  try {
    let client = await prisma.client.findUnique({
      where: authorization
    })
    if (!client) {
      throw {error: "Client não cadastrado."}
    }
    return next();
  }catch (e) {
    return res.status(401).json({error: 'authorization fail', e})
  } 
}
