import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { [key: string]: string | string[] | undefined } = req.body;
  res.status(405).end(`Method Not Allowed`);
  if (req.method === 'POST') {
    const { id, name, email, password } = body;
    try {
      // const user = await prisma.user.create({
      //   data: { id, name, email, password },
      // });
      // res.status(201).json(user);
    } catch (error: ErrorEvent | any) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
