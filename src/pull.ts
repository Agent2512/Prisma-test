import { A } from "@mobily/ts-belt";
import { execSync } from "child_process";
import { readdirSync, copyFileSync, appendFileSync } from "fs";
import { cwd } from 'process';
import { makeGenerator } from "./makeGenerator";

export const pull = () => {
    console.log("Pulling...");

    const pathToPrisma = cwd() + "/prisma/"

    const dataSources = readdirSync(pathToPrisma + "dataSources")

    A.forEach(dataSources, file => {
        console.log(`schema->${file.replace(".prisma", "")}`);

        const path = pathToPrisma + "dataSources/" + file
        const dist = pathToPrisma + "full/" + file

        copyFileSync(path, dist)
        appendFileSync(dist, makeGenerator(file.replace(".prisma", "")))

        execSync(`npx prisma db pull --schema=./prisma/full/${file}`)
    })
}


