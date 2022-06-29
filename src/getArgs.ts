import { A } from '@mobily/ts-belt';
import { argv } from 'process';

export const getArgs = () => A.mapWithIndex(argv, (i, v) => {
    return {
        key: !v.includes("=") ? i : v.slice(0, v.indexOf("=")),
        value: !v.includes("=") ? v : v.slice(v.indexOf("=") + 1),
    };
});
