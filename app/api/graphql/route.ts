import { createYoga } from "graphql-yoga";
import { createSchema } from "graphql-yoga";
import { typeDefs } from "@/lib/graphql/schema";
import { resolvers } from "@/lib/graphql/resolvers";
import { auth } from "@/auth";

const yoga = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers
    }),
    graphqlEndpoint: "/api/graphql",
    context: async () => {
        const session = await auth();
        return {session}
    }
});

export async function GET(request: Request) {
    return yoga.fetch(request);
}

export async function POST(request: Request) {
    return yoga.fetch(request);
}