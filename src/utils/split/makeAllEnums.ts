import { A } from "@mobily/ts-belt";
import { readdirSync, readFileSync, writeFileSync, appendFileSync } from "fs";
import { cwd } from "process";
import { getEnumName } from "./getEnumName";
import { getAllEnumsSets } from "./getAllEnumsSets";

export type Enum = { name: string, enumStr: string }
export type AllEnumNames = { [key: string]: Enum[]; };

export const makeAllEnums = () => {
    const pathToPrisma = cwd() + "/prisma/";
    const fullSchemas = readdirSync(pathToPrisma + "full");



    let allEnums: AllEnumNames = {};

    A.forEach(fullSchemas, fileName => {
        const path = pathToPrisma + "full/" + fileName;
        const fileName2 = fileName.replace(".prisma", "");
        const fileStr = readFileSync(path).toString();

        const enumSetPos = getAllEnumsSets(fileStr);

        if (enumSetPos.length != 0) {
            writeFileSync(`${pathToPrisma}modules/${fileName2}/enum.prisma`, "");

            A.forEach(enumSetPos, (mPos) => {
                const enumStr = fileStr.slice(mPos.start, mPos.end);
                const enumName = getEnumName(enumStr);

                const e: Enum = { name: enumName, enumStr }
                allEnums[fileName2] == undefined ? allEnums[fileName2] = [e] : allEnums[fileName2]?.push(e);

                appendFileSync(`${pathToPrisma}modules/${fileName2}/enum.prisma`, `${enumStr}\n`);
            });
        }
    });

    return allEnums;
};
