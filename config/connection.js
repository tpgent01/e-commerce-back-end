require('dotenv').config();

const Sequelize = require('sequelize');

// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//       host: 'localhost',
//       dialect: 'mysql',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });

const sequelize = new Sequelize('ecommerce_db', 'root', 'Pokemon23?', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
