const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('projectdb', 'root', 'Viet211003@', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const ConnectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default ConnectDB