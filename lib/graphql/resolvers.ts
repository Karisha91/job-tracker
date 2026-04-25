import { prisma } from "@/lib/prisma";

export const resolvers = {
    Query: {
        applications: async () => await prisma.application.findMany(),
        application: async (_, args) => await prisma.application.findUnique({
            where: {
                id: args.id
            }
        })
    },
    Mutation: {
        addApplication: async (_, args) => await prisma.application.create({
            data: {
                company_name: args.company_name,
                role: args.role,
                date_applied: new Date(args.date_applied),
                status: args.status,
                user_id: args.user_id
            }
        })
    }
}