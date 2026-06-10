import { prisma } from "@/lib/prisma";

export const resolvers = {
    Query: {
        applications: async (_: unknown, args: any, context: any) => {
            if (!context.session?.user?.id) throw new Error("Unauthorized");
            return await prisma.application.findMany({
                where: { user_id: context.session.user.id }
            });
        },
        application: async (_: unknown, args: any, context: any) => {
            if (!context.session?.user?.id) throw new Error("Unauthorized");
            return await prisma.application.findUnique({
                where: {
                    id: args.id,
                    user_id: context.session.user.id
                }
            });
        }
    },
    Mutation: {
        addApplication: async (_: unknown, args: any) => await prisma.application.create({
            data: {
                company_name: args.company_name,
                role: args.role,
                date_applied: new Date(args.date_applied),
                status: args.status,
                user_id: args.user_id
            }
        }),
        deleteApplication: async (_: unknown, args: any) => await prisma.application.delete({
            where: {
                id: args.id
            }
        }),
        updateApplication: async (_: unknown, args: any) => await prisma.application.update({
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
        addNote: async (_: unknown, args: any, context: any) => {
            const application = await prisma.application.findUnique({
                where: { id: args.application_id }
            });
            if (application?.user_id !== context.session.user.id) {
                throw new Error("Unauthorized");
            }
            const note = await prisma.note.create({
                data: {
                    content: args.content,
                    application_id: args.application_id
                }
            });
            return note;
        },
        deleteNote: async (_: unknown, args: any) => await prisma.note.delete({
            where: {
                id: args.id
            }
        })
    }
};