import { findAllIndices } from "../findAllIndices";


export const getEnumName = (modelStr: string) => {
    const start = findAllIndices(modelStr, "m")[0];
    const end = findAllIndices(modelStr, "{")[0];

    const enumName = modelStr.slice(start ? start + 1 : 0, end).trim();

    return enumName;
};
