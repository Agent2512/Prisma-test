import { A, N } from "@mobily/ts-belt";
import { findAllIndices } from "../findAllIndices";


export const getAllEnumsSets = (text: string) => {
    const modelsStartPos = findAllIndices(text, "enum");
    const allEndpos = findAllIndices(text, "}");

    type set = { start: number; end: number; };

    return A.reduce<number, set[]>(modelsStartPos, [], (acc, pos) => {
        const end = A.find(allEndpos, p => N.gt(p, pos));

        return [
            ...acc,
            {
                start: pos,
                end: end ? end + 1 : 0
            }
        ];
    });
};
