import { A } from "@mobily/ts-belt";

export const findAllIndices = (text: string, searchValue: string) => {
    let indices: number[] = [];

    for (var i = 0; i < text.length; i++) {
        const index = text.indexOf(searchValue, i * searchValue.length);

        if (A.includes(indices, index)) { continue }

        if (index == -1) { continue }

        indices.push(index);
    }

    return indices;
}