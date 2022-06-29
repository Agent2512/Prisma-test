import { A, F } from "@mobily/ts-belt";
import { execSync } from "child_process";
import { readdirSync, writeFileSync } from "fs";
import { cwd } from "process";
import { makeExports, makeGlobals, makeImports } from "./makePrismaConnect";

export const gen = () => {
    console.log("generating...");
    const pathToPrisma = cwd() + "/prisma/"

    const fullSchemas = readdirSync(pathToPrisma + "full")

    A.forEach(fullSchemas, file => {
        console.log(`generating: schema->${file}`);

        execSync(`npx prisma generate --schema=./prisma/full/${file}`)
    })

    console.log("generating: prismaConnect");
    const dbs = F.toMutable(A.map(fullSchemas, file => file.replace(".prisma", "")));
    writeFileSync(pathToPrisma+"prismaConnect.ts", `${makeImports(dbs)}\n${makeGlobals(dbs)}\n${makeExports(dbs)}`)
}