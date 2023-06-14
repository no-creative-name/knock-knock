import { type NextApiRequest, type NextApiResponse } from "next"
import { prisma } from "../../server/db"

interface GetRequestWithBody extends NextApiRequest {
  body: {
    name: string;
    isComing: boolean;
  }
}

interface DeleteRequestWithBody extends NextApiRequest {
  body: {
    id: string;
  }
}

const handler = async (req: GetRequestWithBody | DeleteRequestWithBody, res: NextApiResponse<{message: string}>) => {
  if(req.method === 'DELETE') {
    await prisma.employee.delete({
      where: {
        id: req.body.id,
      }
    });
    res.status(200);
    res.json({message: 'Success'});
  } else {
    await prisma.employee.create({
      data: {
        name: req.body.name,
        isComing: req.body.isComing,
      }
    });
    res.status(200);
    res.json({message: 'Success'});
  }
}
 
export default handler