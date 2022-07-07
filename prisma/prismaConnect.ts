import { PrismaClient as PrismaClient_dashboard } from "./libs/dashboard";
import { PrismaClient as PrismaClient_nextauth } from "./libs/nextauth";
import { PrismaClient as PrismaClient_phpmyadmin } from "./libs/phpmyadmin";
declare global {
var prisma_dashboard: PrismaClient_dashboard | undefined;
var prisma_nextauth: PrismaClient_nextauth | undefined;
var prisma_phpmyadmin: PrismaClient_phpmyadmin | undefined;
}
export const prismaConnect_dashboard = global.prisma_saf ||= new PrismaClient_dashboard();
export const prismaConnect_nextauth = global.prisma_saf ||= new PrismaClient_nextauth();
export const prismaConnect_phpmyadmin = global.prisma_saf ||= new PrismaClient_phpmyadmin();