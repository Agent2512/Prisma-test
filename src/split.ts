import { A, D } from "@mobily/ts-belt"
import { readdirSync, existsSync, mkdirSync } from "fs"
import { cwd } from "process"
import { DbRelations, findAllRelations } from "./utils/split/findAllRelations"
import { fixModelEnums } from "./utils/split/fixModelEnums"
import { makeAllEnums } from "./utils/split/makeAllEnums"
import { makeAllModules } from "./utils/split/makeAllModules"

export const split = () => {
    console.log("split...");

    const pathToPrisma = cwd() + "/prisma/"

    const fullSchemas = readdirSync(pathToPrisma + "full")

    A.forEach(fullSchemas, fileName => {
        console.log(`splitting: schema->${fileName}`);

        const isDir = existsSync(pathToPrisma + "modules/" + fileName.replace(".prisma", ""))

        isDir == false && mkdirSync(pathToPrisma + "modules/" + fileName.replace(".prisma", ""))
    })

    const allEnums = makeAllEnums()

    const allModels = makeAllModules()

    fixModelEnums(allModels, allEnums)

    const allRelations = findAllRelations(allModels)


}

const fixAllRelations = (dbRelations: DbRelations) => {
    const dbKeys = D.keys(dbRelations)

    A.forEach(dbKeys, dbKey => {
        const db = dbRelations[dbKey]
        if (!db) return;           

    })
}