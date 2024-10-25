"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function getOrders(userId : string) {
    const portfolio = await prisma.order.findMany({
        where:{
            userId : userId,
        }
    })
    if(portfolio){
        console.log(portfolio)
        return portfolio
    }
    throw new Error("error fetching orders")
   
    
}
