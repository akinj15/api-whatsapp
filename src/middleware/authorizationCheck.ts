import { Response, Request } from "express";
import { prisma } from '../database';
import { z } from "zod";

export default (req: Request, res: Response, next: any) => {
  const authorizationSchema = z.object({
    identificadorNumero: z.string(),
    identificadorConta: z.string(),
  });
  const authorization = authorizationSchema.parse(req.headers);
  try {
    prisma.client.findUnique({
      where: authorization
    })
    return next();
  }catch (e) {
    return res.status(401).json({error: 'authorization fail', e})
  } 
}
