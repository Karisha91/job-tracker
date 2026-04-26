

export const typeDefs = `
    enum Status {
        APPLIED
        INTERVIEW
        REJECTED
        OFFER
    }

    type Application {
        id: ID!
        company_name: String!
        role: String!
        date_applied: String!
        status: Status!
        user_id: String!
        notes: [Note!]
    }

    type Note {
        id: ID!
        content: String!
        created_at: String!
        application_id: String!
    }

    type Query {
        applications: [Application!]!
        application(id: ID!): Application!
    }

    type Mutation {
        addApplication(company_name: String!, role: String!, date_applied: String!, status: Status!, user_id: String!): Application!
        deleteApplication(id: ID!): Application!
        updateApplication(id: ID!,company_name: String!, role: String!, date_applied: String!, status: Status!, user_id: String!): Application!
        addNote(content: String!, application_id: String!): Note!
        deleteNote(id: ID!): Note!
    }
`