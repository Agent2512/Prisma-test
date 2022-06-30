import { A, D, S } from "@mobily/ts-belt";
import { appendFileSync } from "fs";
import { cwd } from "process";

export function fixModelEnums(allModels: { [db: string]: { name: string; modelStr: string; }[]; }, allEnums: { [key: string]: { name: string; enumStr: string; }[]; }) {
    A.forEach(D.keys(allModels), dbKey => {
        const enums = allEnums[dbKey];
        if (enums == undefined)
            return;
        const db = allModels[dbKey];
        if (db == undefined)
            return;

        const pathToPrisma = cwd() + "/prisma/";

        A.forEach(db, model => A.forEach(enums, e => {
            const isEnumInModel = S.includes(model.modelStr, e.name);

            if (isEnumInModel) {
                appendFileSync(`${pathToPrisma}modules/${dbKey}/${model.name}.prisma`, `\n${e.enumStr}`);
            }
        }));
    });
}
