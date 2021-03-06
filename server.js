import cors from 'cors';
import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './src/backend/schema';


// config
const APP_PORT = (process.env.PORT || 8000);
const app = new Express();

app.use(cors());

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));

app.listen(APP_PORT, () => {
  console.log(`app listening on port  ${APP_PORT}`);
});
