import { PrismaClient as PrismaClient_dach } from "./libs/dach";import { PrismaClient as PrismaClient_test } from "./libs/test";
declare global { var prisma_dach: PrismaClient_dach | undefined;var prisma_test: PrismaClient_test | undefined; }
export const prismaConnect_dach = global.prisma_saf ||= new PrismaClient_dach();export const prismaConnect_test = global.prisma_saf ||= new PrismaClient_test();