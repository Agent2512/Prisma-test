import { findAllIndices } from "../findAllIndices";


export const getModelName = (modelStr: string) => {
    const start = findAllIndices(modelStr, "l")[0];
    const end = findAllIndices(modelStr, "{")[0];

    const modelName = modelStr.slice(start ? start + 1 : 0, end).trim();

    return modelName;
};
