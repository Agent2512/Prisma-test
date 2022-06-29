import { A } from '@mobily/ts-belt';
import { gen } from './gen';
import { getArgs } from './getArgs';
import { init } from './init';
import { pull } from './pull';


const args = getArgs()

if (A.find(args, a => a.value == "all")) {
    init()
    pull()
    gen()
}
else if (A.find(args, a => a.value == "init")) {
    init()
}
else if (A.find(args, a => a.value == "pull")) {
    pull()
}
else if (A.find(args, a => a.value == "gen")) {
    gen()
}


