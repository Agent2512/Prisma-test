import { A, pipe } from "@mobily/ts-belt"

export const makeImports = (dbs: string[]) => {
    const makeImport = (db: string) => `import { PrismaClient as PrismaClient_${db} } from "./libs/${db}";`

    return pipe(dbs, A.map(db => makeImport(db)), A.join("\n"))
}

export const makeExports = (dbs: string[]) => {
    const makeExport = (db: string) => `export const prismaConnect_${db} = global.prisma_saf ||= new PrismaClient_${db}();`;

    return pipe(dbs, A.map(db => makeExport(db)), A.join("\n"))
}

export const makeGlobals = (dbs: string[]) => {
    const makeGlobal = (db: string) => `var prisma_${db}: PrismaClient_${db} | undefined;`;

    const globals = pipe(dbs, A.map(db => makeGlobal(db)), A.join("\n"))

    return `declare global {\n${globals}\n}`
}

export const makePrismaConnect = (dbs: string[]) => `${makeImports(dbs)}\n${makeGlobals(dbs)}\n${makeExports(dbs)}`