import { prisma } from "../database";

type Client = {
  id?:number;
  name: string; 
  email: string;
  identificadorNumero: string;
  identificadorConta: string;
  whatsappToken: string;
};

class ClientService {
  async create(client: Client) {
    try {
      let res = await prisma.client.create({
        data: {
          name: client.name,
          email: client.email,
          identificadorNumero: client.identificadorNumero,
          identificadorConta: client.identificadorConta,
          whatsappToken: client.whatsappToken,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findClientById(id: number) {
    let clientDB = await prisma.client.findUnique({
      where: { id: id },
    });
    if (!clientDB?.id) {
      throw { error: "user not found" };
    }
    return clientDB;
  }

  async findClientByIdentificadorConta(identificador: string) {
    let clientDB = await prisma.client.findUnique({
      where: { identificadorConta: identificador },
    });
    if (!clientDB?.id) {
      throw { error: "user not found" };
    }
    return clientDB;
  }

  async findAll() {
    let clientDB = await prisma.client.findMany();
    return clientDB;
  }

  async updateClient(client: Client) {
    let clientDB = await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        email: client.email,
        identificadorNumero: client.identificadorNumero,
        identificadorConta: client.identificadorConta,
        whatsappToken: client.whatsappToken,
      },
    });
    return clientDB;
  }
}

export const clientService = new ClientService();
