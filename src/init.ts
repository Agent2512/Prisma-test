import { A } from "@mobily/ts-belt";
import { readdirSync, mkdirSync } from "fs"
import { cwd } from "process"

export const init = ():void => {
    console.log("init...");
    const dir = readdirSync(cwd())

    if (A.includes(dir, "prisma")) {
        const prismaDir = readdirSync(cwd() + "/prisma")

        if (A.includes(prismaDir, "datasources") == false) {
            mkdirSync(cwd() + "/prisma/datasources")
        }

        if (A.includes(prismaDir, "full") == false) {
            mkdirSync(cwd() + "/prisma/full")
        }

        if (A.includes(prismaDir, "modules") == false) {
            mkdirSync(cwd() + "/prisma/modules")
        }

        if (A.includes(prismaDir, "libs") == false) {
            mkdirSync(cwd() + "/prisma/libs")
        }
    }
    else {
        mkdirSync(cwd() + "/prisma")
        return init()
    }

    
}

// prisma
// prisma/datasources
// prisma/full
// prisma/modules
// prisma/libs