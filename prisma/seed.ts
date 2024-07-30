import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
    const modelNames = orderedFileNames.map((fileName) => {
        const modelName = path.basename(fileName, path.extname(fileName));
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    });

    for (const modelName of modelNames) {
        const model: any = prisma[modelName as keyof typeof prisma];
        if (model) {
            await model.deleteMany({});
            console.log(`Deleted all ${modelName} data`);
        } else {
            console.error(
                `Model ${modelName} not found in Prisma schema.`
            )
        }
    }
};

async function main() {
    const dataDir = path.join(__dirname, "seedData");

    const orderedFileNames = [
        "products.json",
        "expenseSummary.json",
        "sales.json",
        "salesSummary.json",
        "purchases.json",
        "purchaseSummary.json",
        "users.json",
        "expenses.json",
        "expenseByCategory.json",
    ];

    await deleteAllData(orderedFileNames);

    for (const fileName of orderedFileNames) {
        const filePath = path.join(dataDir, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const modelName = path.basename(fileName, path.extname(fileName));
        const model: any = prisma[modelName as keyof typeof prisma];

        if (!model) {
            console.error(`Model ${modelName} not found in Prisma schema.`);
            continue;
        }

        for (const data of jsonData) {
            await model.create({ data });
        };

        console.log(`Seeded ${modelName} data`);
    }
};

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    }); 

