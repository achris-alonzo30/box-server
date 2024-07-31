import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory  = async (req: Request, res: Response): Promise<void> => {
    try {
        const ExpenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            orderBy: {
                date: "desc"
            }
        });
        const expenseByCategorySummary = ExpenseByCategorySummaryRaw.map((item) => ({
            ...item,
            amount: item.amount.toString()
        }));

        res.json(expenseByCategorySummary);

    } catch (err) {
        res.status(500).json({
            message: "Error retrieving users.",
        })
    }
}