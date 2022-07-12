import { A, D, F, O, pipe, S } from "@mobily/ts-belt";
import { AllModels } from "./makeAllModules";

export type DbRelations = {
    [db: string]: {
        [model: string]: string[];
    };
};

export const findAllRelations = (allModels: AllModels) => {
    const modelsTypes = A.reduce<string | number, DbRelations>(D.keys(allModels), {}, (acc, db) => {
        const models = allModels[db];
        if (models == undefined)
            return acc;

        for (const model of models) {
            let row = model.modelStr.split("\n");
            row = row.slice(1, row.length - 1)
            row = row.filter(ls => !ls.includes("@@"))
            row = row.filter(ls => ls.trim() != "")
            let types = A.filterMap(row, ls => {
                const r = ls.match(/\b\w+\b/g)

                return r?.at(1) || O.None
            })

            if (types.length != 0) {
                acc[db] = {
                    ...acc[db],
                    [model.name]: F.toMutable(types)
                };
            }
        }

        return acc;
    });

    const relationsData = A.reduce<string | number, DbRelations>(D.keys(modelsTypes), {}, (acc, db) => {
        const models = modelsTypes[db]
        if (models == undefined) return acc
        const keys = D.keys(models)

        for (const key of keys) {
            const model = models[key]
            if (model == undefined) continue

            let relations = A.filterMap(model, type => {
                if (keys.includes(type)) {
                    return type
                }

                return O.None
            })

            if (relations.length != 0) {
                acc[db] = {
                    ...acc[db],
                    [key]: F.toMutable(relations)
                };
            }

        }

        return acc;
    });

    // console.log(relationsData);
    return relationsData;
};
