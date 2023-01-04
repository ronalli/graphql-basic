const express = require('express');

const graphqlHTTP = require('express-graphql').graphqlHTTP;
const cors = require('cors');
const schema = require('./Schema/schema');

const users = [{ id: 32423435, username: 'Bob', age: 28 }];

const app = express();

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

const createUserBase = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },
  getUsers: ({ id }) => {
    return users.find((user) => user.id === +id);
  },
  createUser: ({ input }) => {
    const user = createUserBase(input);
    users.push(user);
    return user;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => console.log('Server started'));
