import Sequelize from 'sequelize';

const Conn = new Sequelize(
  'db3tnug1mbi5fl',
  'mkmpkmupdsptko',
  '4c5745a07d77b5f46c19093d78003b06708730e0c01670e82354c5e6e70b67cf',
  {
    dialect: 'postgres',
    host: 'ec2-54-221-244-196.compute-1.amazonaws.com',
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
