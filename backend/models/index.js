const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const db = {};

let sequelize = new Sequelize(
  config.get('db.name'),
  config.get('db.username'),
  config.get('db.password'),
  {
    host: config.get('db.host'),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'test' ? false : true,
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

// Read through the models directory and load all models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    ); // Use require instead of import
    let name = model.name; // Sequelize automatically sets the model's name based on the model definition.
    db[name] = model;
  });

// Associate models if needed
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach sequelize and Sequelize instances to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
