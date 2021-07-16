
import { ApolloServer } from 'apollo-server';
import { environment } from './environment';
import * as typeDefs from './type-defs.graphql';
import {
  DateTimeMock,
  EmailAddressMock,
  UnsignedIntMock,
} from 'graphql-scalars';

const server = new ApolloServer({
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  mocks: {
    DateTime: DateTimeMock,
    EmailAddress: EmailAddressMock,
    UnsignedInt: UnsignedIntMock,
  }, // TODO: Remove in PROD.
  mockEntireSchema: false, // TODO: Remove in PROD.
});

server
  .listen(environment.port)
  .then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}