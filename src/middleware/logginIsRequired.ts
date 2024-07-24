import { Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import config from "../../config"
import { prisma } from "../database";

const secret: string = config.db.tokenSecret || ""
export default async (req: any, res: Response, next: any) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({error: 'Login is required'});
  }
  const [, token] = authorization.split(' ');
  try {
    const data: any = jwt.verify(token, secret);
    
    let client = await prisma.user.findUnique({
      where: {
        id: data.id,
        email: data.email
      },
    }); 
    if (!client) {
      throw {error: "Falha na autenticação"};
    }
    return next();
  }catch (e) {
    return res.status(401).json({error: 'authorization fail', e})
  }
}
