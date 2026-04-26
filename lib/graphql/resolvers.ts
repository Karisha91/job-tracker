import { prisma } from "@/lib/prisma";

export const resolvers = {
    Query: {
        applications: async (_, args, context) => await prisma.application.findMany({
            where: {
                user_id: context.session.user.id
            }
       } ),
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
        
        }),
        deleteApplication: async (_, args) => await prisma.application.delete({
            where: {
                id: args.id
            }
        }),
        updateApplication: async (_, args) => await prisma.application.update({
            where: {
                id: args.id
            },
            data: {
                company_name: args.company_name,
                role: args.role,
                date_applied: new Date(args.date_applied),
                status: args.status,
                user_id: args.user_id
            }
        }),
        addNote: async (_, args) => await prisma.note.create({
            data: {
                content: args.content,
                application_id: args.application_id
            }
        }),
        deleteNote: async (_, args) => await prisma.note.delete({
            where: {
                id: args.id
            }
        })
    }
}