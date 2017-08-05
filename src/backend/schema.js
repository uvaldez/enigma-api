import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
} from 'graphql';

import DB from './db';
import { encrypt, decrypt } from './utils';

const MessageType = new GraphQLObjectType({
  name: 'Message',
  description: 'This represents a message',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(message) {
          return message.id;
        },
      },
      name: {
        type: GraphQLString,
        resolve(message) {
          return message.name;
        },
      },
      message: {
        type: GraphQLString,
      },
      expiration: {
        type: GraphQLString,
        resolve(message) {
          return message.expiration;
        },
      },
      hash: {
        type: GraphQLString,
        resolve(message) {
          return message.hash;
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation type',
  fields: () => {
    return {
      addMessage: {
        type: MessageType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'name of the person in the message',
          },
          message: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the message',
          },
          expiration: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'expiration date',
          },
          hash: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'hash',
          },
        },
        resolve(_, args) {
          const encDecrypted = encrypt(args.message, args.hash);
          return DB.models.messages.create({
            name: args.name,
            message: encDecrypted,
            expiration: args.expiration,
            hash: args.hash,
          }).then((m) => {
            return m;
          });
        },
      },
      getMessage: {
        type: MessageType,
        args: {
          passphrase: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'secret passphrase',
          },
          message: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the message',
          },
        },
        resolve(_, args) {
          return DB.models.messages.findOne({ where: {
            hash: args.passphrase,
            message: args.message } }).then((r) => {
            if (!r) return null;
            const data = r;
            if (data.dataValues.expiration.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
              return null;
            }
            data.dataValues.message = decrypt(r.dataValues.message, args.passphrase);
            return data;
          });
        },

      },
    };
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => {
    return {
      message: {
        args: {
          passphrase: {
            type: GraphQLString,
            description: 'Secret passphrase',
          },
          message: {
            type: GraphQLString,
            description: 'The encrypted message',
          },
        },
        type: MessageType,
        resolve(root, args) {
          return DB.models.messages.findOne({ where: {
            hash: args.passphrase,
            message: args.message } }).then((r) => {
            if (!r) return null;
            const data = r;
            data.dataValues.message = decrypt(r.dataValues.message, args.passphrase);
            return data;
          });
        },
      },
    };
  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
