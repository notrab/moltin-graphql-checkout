import { GraphQLServer } from 'graphql-yoga'
import { gateway as MoltinGateway } from '@moltin/sdk'

import { Prisma } from './generated/prisma'
import resolvers from './resolvers'

const moltin = MoltinGateway({
  client_id: process.env.MOLTIN_CLIENT_ID
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    moltin
  })
})

server.start(() => console.log('Server is running on http://localhost:4000'))
