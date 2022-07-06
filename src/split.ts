import { A, D, F } from "@mobily/ts-belt"
import { readdirSync, existsSync, mkdirSync } from "fs"
import { cwd } from "process"
import { findAllIndices } from "./utils/findAllIndices"
import { fixModelEnums } from "./utils/split/fixModelEnums"
import { makeAllEnums } from "./utils/split/makeAllEnums"
import { AllModels, makeAllModules } from "./utils/split/makeAllModules"

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

    findAllRelationsTo(allModels)
}


const findAllRelationsTo = (allModels: AllModels) => {
    A.forEach(D.keys(allModels), dbs => {
        const models = allModels[dbs]
        if (models == undefined) return

        A.forEach(models, m => {
            const relations = findAllIndices(m.modelStr, "@relation")
            if (relations.length == 0) return
            const test = m.modelStr.split("\n")
            const test2 = A.filter(test, l => {
                return l.includes("@relation")
            })
            const test3 =  A.map(test2, l => {
                return l.match(/\b\w+\b/g)
            })
            
            const test4 = A.reduce<(RegExpMatchArray | null), string[]>(F.toMutable(test3), [], (acc, lar) => {
                if (lar == null) return acc
                const value = lar[1]
                if (value == undefined) return acc
                return [
                    ...acc,
                    value
                ]
            })

            console.log(dbs, m.name, test4);

        })
    })
}

