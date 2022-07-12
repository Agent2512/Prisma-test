import { A, D } from "@mobily/ts-belt"
import { readdirSync, existsSync, mkdirSync, readFileSync, appendFileSync, writeFileSync } from "fs"
import { cwd } from "process"
import {  DbRelations, findAllRelations } from "./utils/split/findAllRelations"
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
    fixAllRelations(allRelations)

}

const fixAllRelations = (dbRelations: DbRelations) => {
    const pathToPrisma = cwd() + "/prisma/"

    A.forEach(D.keys(dbRelations), dbKey => {
        const models = dbRelations[dbKey]
        if (!models) return;
        const keys = D.keys(models)
        

        for (const key of keys) {
            
        }
    })
}