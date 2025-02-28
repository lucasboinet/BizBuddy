import prisma from "@/lib/primsa";
import { type NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('query') as string;
  console.log({ search })
  
  const customers = await prisma.customer.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search
          }
        },
        {
          email: {
            contains: search
          }
        }
      ]
    }
  });

  return Response.json(customers);
}