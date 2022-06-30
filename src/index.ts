import { A } from '@mobily/ts-belt';
import { gen } from './gen';
import { getArgs } from './utils/getArgs';
import { init } from './init';
import { pull } from './pull';
import { split } from './split';


const args = getArgs()
init()

if (A.find(args, a => a.value == "all")) {
    pull()
    if (A.find(args, a => a.value == "split")) split()
    gen()
}
else if (A.find(args, a => a.value == "pull")) {
    pull()
    if (A.find(args, a => a.value == "split")) split()
    
}
else if (A.find(args, a => a.value == "gen")) {
    gen()
}
else if (A.find(args, a => a.value == "split")) {
    split()
}


