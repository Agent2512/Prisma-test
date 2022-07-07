import { A, D, F, pipe, S } from "@mobily/ts-belt";
import { AllModels } from "./makeAllModules";

export type DbRelations = {
    [db: string|number]: {
        [model: string|number]: string[];
    };
};

export const findAllRelations = (allModels: AllModels) => {
    const keys = D.keys(allModels);

    const testData = A.reduce<string | number, DbRelations>(keys, {}, (acc, db) => {
        const models = allModels[db];
        if (models == undefined)
            return acc;

        for (const model of models) {
            if (model.modelStr.includes("@relation") == false)
                continue;

            const relations = pipe(
                model.modelStr,
                S.split("\n"),
                A.filter(l => l.includes("@relation")),
                A.map(l => S.match(l, /\b\w+\b/g)),
                A.map(l => l?.at(1)),
                F.toMutable
            );

            if (relations.length != 0) {
                acc[db] = {
                    ...acc[db],
                    [model.name]: relations
                };
            }

        }

        return acc;
    });

    return testData;
};
