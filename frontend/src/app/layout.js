'use client'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

import { Header } from '@/components'

import ContextWrapper from '@/context/ContextWrapper'

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const httpLink = new HttpLink({
  uri: 'http://localhost:8000/api/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://localhost:8000/graphql/`,
    options: {
      reconnect: true,
    },
  }),
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>EvenlySplit</title>
        <meta
          name="description"
          content="CS 396 Full Stack Web Application: EvenlySplit"
        />
        <meta name="title" content="EvenlySplit" />
      </head>
      <ApolloProvider client={client}>
        <ContextWrapper>
          <body className={`${inter.className} bg-lightblue`}>
            {children}
            <Header />
          </body>
        </ContextWrapper>
      </ApolloProvider>
    </html>
  )
}
