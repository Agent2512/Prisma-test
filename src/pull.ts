import { A } from "@mobily/ts-belt";
import { execSync } from "child_process";
import { readdirSync, copyFileSync } from "fs";
import { cwd } from 'process';

export const pull = () => {
    console.log("Pulling...");

    const pathToPrisma = cwd() + "/prisma/"

    const dataSources = readdirSync(pathToPrisma + "dataSources")

    A.forEach(dataSources, file => {
        console.log(`Pulling: schema->${file}`);


        const path = pathToPrisma + "dataSources/" + file
        const dist = pathToPrisma + "full/" + file

        copyFileSync(path, dist)

        execSync(`npx prisma db pull --schema=./prisma/full/${file}`)
    })
}


