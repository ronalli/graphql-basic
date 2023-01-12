const express = require('express');
const mongoose = require('mongoose');

const graphqlHTTP = require('express-graphql').graphqlHTTP;
const cors = require('cors');
const schema = require('./Schema/schema');
const User = require('./models/user');

const PORT = 4000;
const URL =
  'mongodb+srv://ronalli:W4H3n5PshoODuFsP@cluster0.yrtohnv.mongodb.net/graphql';

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(`DB connection error: ${err}`));

const root = {
  getAllUsers: async () => {
    const users = await User.find();
    return users;
  },
  getUser: async ({ id }) => {
    const user = await User.findById(id);
    return user;
  },
  createUser: ({ input }) => {
    const user = new User(input);
    user.save();
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

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server started, port ${PORT}`);
});
