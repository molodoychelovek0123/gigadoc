import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const isStr = (x: any): x is string => typeof x === 'string';

  // Возврат потерянной типизации

  if (req.method === 'POST') {
    const body: { [key: string]: string | string[] | undefined } = req.body;

    const {
      id: idQuery,
      name: nameQuery,
      description: descriptionQuery,
      ownerId: ownerIdQuery = 1,
      path: pathQuery,
    } = body;

    const id = isStr(idQuery) ? Number(idQuery) : undefined;
    const name = isStr(nameQuery) ? nameQuery : 'document_blank';
    const description = isStr(descriptionQuery) ? descriptionQuery : '';
    const ownerId = isStr(ownerIdQuery) ? Number(ownerIdQuery) : 1;
    const docPath = isStr(pathQuery) ? pathQuery : undefined;

    try {
      if (id && docPath) {
        const document = await prisma.document.create({
          data: { id, name, description, ownerId, path: docPath },
        });
        res.status(201).json(document);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    const { query } = req;

    const { ownerId: ownerIdQuery = 1 } = query;

    const ownerId = isStr(ownerIdQuery) ? Number(ownerIdQuery) : 1;

    const documents = await prisma.document.findMany({
      where: { ownerId },
      orderBy: {
        updatedAt: 'desc', // или 'asc' для сортировки в порядке возрастания
      },
    });
    res.status(200).json(documents);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
