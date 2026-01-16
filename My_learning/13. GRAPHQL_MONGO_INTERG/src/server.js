const { ApolloServer } = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./database/db');


async function startServer() {
    await connectDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });


    const { url } = await startStandaloneServer(server, {
        listen: { port:     process.env.PORT || 4000},
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServer(); 