

export const makeGenerator = (name: string) => `generator client {
    provider = "prisma-client-js"
    output = "../libs/${name}"
}
`