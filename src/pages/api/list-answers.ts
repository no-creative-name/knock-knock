import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse<{answers: {
  name: string;
  isComing: boolean;
}[]}>) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const answers = await prisma.employee.findMany({where: {
    createdAt: {
      gte: today,
      lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    }
  }});
  res.status(200);
  res.json({answers});
}
 
export default handler