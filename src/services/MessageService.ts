import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { prisma } from "../database";

type TextMessageInput = {
  text: string
  number: string
  identificadornumero: string
  identificadorconta: string
  token: string
}

type ClientMessageInput = {
  type: string;
  to: string;
  identificadornumero: string;
  identificadorconta: string;
};

type DocumentMessageInput = {
  number: string;
  identificadornumero: string;
  identificadorconta: string;
  token: string;
  filename: string;
  mimetype: string;
  caption: string;
};

class MessageService {
  async text(message: TextMessageInput) {
    try {
      const url =
        "https://graph.facebook.com/v20.0/" +
        message.identificadornumero +
        "/messages";
      const body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: message.number,
        type: "text",
        text: {
          preview_url: true,
          body: message.text,
        },
      };
      const header = {
        headers: {
          Authorization: "Bearer " + message.token,
          "Content-Type": "application/json",
        },
      };
      let res = await axios.post(url, body, header);
      await this.gravaMensagemCliente({
        identificadornumero: message.identificadornumero,
        identificadorconta: message.identificadorconta,
        to: message.number,
        type: "text",
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async document(message: DocumentMessageInput) {
    try {
      let documentId = await this.uploadDocument(message);
      if (!documentId) {
        throw { Error: "Documento não foi criado com sucesso." };
      }
      let res = await this.sendDocument(message, documentId);
      await this.deleteDocument(documentId, message.token);
      await this.gravaMensagemCliente({
        identificadornumero: message.identificadornumero,
        identificadorconta: message.identificadorconta,
        to: message.number,
        type: "document",
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async uploadDocument(
    message: DocumentMessageInput
  ): Promise<string | undefined> {
    try {
      const urlMedia =
        "https://graph.facebook.com/v20.0/" +
        message.identificadornumero +
        "/media";
      const header = {
        headers: {
          Authorization: "Bearer " + message.token,
        },
      };
      const caminho = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        message.filename
      );

      var form = new FormData();
      form.append("file", fs.createReadStream(caminho));
      form.append("type", message.mimetype);
      form.append("messaging_product", "whatsapp");

      let res = await axios.post(urlMedia, form, header);
      if (res.data.id) {
        fs.unlink(caminho, (e) => {
          if (e) throw { error: "erro ao deleter o arquivo temporario." };
        });
      }
      return res.data.id;
    } catch (error) {
      throw error;
    }
  }

  async sendDocument(
    message: DocumentMessageInput,
    documentId: string
  ): Promise<object | undefined> {
    try {
      const url =
        "https://graph.facebook.com/v20.0/" +
        message.identificadornumero +
        "/messages";
      const body = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: message.number,
        type: "document",
        document: {
          id: documentId,
          caption: message.caption,
        },
      };
      const header = {
        headers: {
          Authorization: "Bearer " + message.token,
          "Content-Type": "application/json",
        },
      };
      let res = await axios.post(url, body, header);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(id: string, token: string) {
    try {
      const urlMedia = "https://graph.facebook.com/v20.0/" + id;
      const header = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let res = await axios.delete(urlMedia, header);
      if (!res.data.success)
        throw { error: "falha ao deletar o documento na api whatsapp" };
    } catch (error) {
      throw error;
    }
  }

  async gravaMensagemCliente(message: ClientMessageInput) {
    try {
      const authorization = {
        identificadornumero: message.identificadornumero,
        identificadorconta: message.identificadorconta,
      };
      let client = await prisma.client.findUnique({
        where: authorization,
      });
      if (client) {
        await prisma.message.create({
          data: {
            to: message.to,
            type: "text",
            clientId: client.id,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async listaMensagens() {
    try {
      let mensagem = await prisma.message.findMany({include: {client: true}});
      return mensagem;
    } catch (error) {
      throw error;
    }
  }
}

export const messageService = new MessageService();
