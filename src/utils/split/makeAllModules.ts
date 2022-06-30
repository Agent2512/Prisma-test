import { A } from "@mobily/ts-belt";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { cwd } from "process";
import { getAllModelSets } from "./getAllModelSets";
import { getModelName } from "./getModelName";

export const makeAllModules = () => {
    const pathToPrisma = cwd() + "/prisma/";
    const fullSchemas = readdirSync(pathToPrisma + "full");

    type Model = { name: string; modelStr: string; };
    type AllModels = { [db: string]: Model[]; };

    let allModels: AllModels = {};

    A.forEach(fullSchemas, fileName => {
        const path = pathToPrisma + "full/" + fileName;
        const fileName2 = fileName.replace(".prisma", "");
        const fileStr = readFileSync(path).toString();

        const modelSetPos = getAllModelSets(fileStr);

        A.forEach(modelSetPos, (mPos) => {
            const modelStr = fileStr.slice(mPos.start, mPos.end);
            const modelName = getModelName(modelStr);

            const model: Model = { name: modelName, modelStr };

            allModels[fileName2] == undefined ? allModels[fileName2] = [model] : allModels[fileName2]?.push(model);

            writeFileSync(`${pathToPrisma}modules/${fileName2}/${modelName}.prisma`, modelStr);
        });
    });

    return allModels;

};
