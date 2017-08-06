import Sequelize from 'sequelize';

const Conn = new Sequelize(
  'enigma',
  'uzielvaldez',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost',
  },
);

const Message = Conn.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  expiration: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  hash: {
    type: Sequelize.STRING(120),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
  },
});

Conn.sync({ force: true }).then(() => {
  console.log('Tables were created!');
});

export default Conn;
