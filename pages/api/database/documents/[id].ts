import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const isStr = (x: any): x is string => typeof x === 'string';

  const { id: queryId, ownerId: queryOwnerId } = req.query;

  const id = isStr(queryId) ? Number(queryId) : undefined;
  const ownerId = isStr(queryOwnerId) ? Number(queryOwnerId) : 1;

  if (id) {
    if (req.method === 'GET') {
      try {
        const document = await prisma.document.findUnique({
          where: { id, ownerId },
          include: { owner: true },
        });
        if (document) {
          res.status(200).json(document);
        } else {
          res.status(404).json({ error: 'Document not found' });
        }
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    } else if (req.method === 'PUT') {
      const { name, description, ownerId } = req.body;
      try {
        const document = await prisma.document.update({
          where: { id },
          data: { name, description, ownerId },
        });
        res.status(200).json(document);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    } else if (req.method === 'DELETE') {
      try {
        const document = await prisma.document.delete({
          where: { id },
        });
        res.status(200).json(document);
      } catch (error) {
        res.status(404).json({ error: 'Document not found' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } else {
    res.status(422).end(`Invalid ID`);
  }
}
