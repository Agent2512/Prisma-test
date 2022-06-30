import { PrismaClient as PrismaClient_dach } from "./libs/dach";
import { PrismaClient as PrismaClient_nextauth } from "./libs/nextauth";
import { PrismaClient as PrismaClient_phpmyadmin } from "./libs/phpmyadmin";
declare global {
var prisma_dach: PrismaClient_dach | undefined;
var prisma_nextauth: PrismaClient_nextauth | undefined;
var prisma_phpmyadmin: PrismaClient_phpmyadmin | undefined;
}
export const prismaConnect_dach = global.prisma_saf ||= new PrismaClient_dach();
export const prismaConnect_nextauth = global.prisma_saf ||= new PrismaClient_nextauth();
export const prismaConnect_phpmyadmin = global.prisma_saf ||= new PrismaClient_phpmyadmin();