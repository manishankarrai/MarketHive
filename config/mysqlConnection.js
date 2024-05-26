const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'myshop',
    'root',
    'Rajan@123',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); 
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connectDB();

module.exports = {
    sequelize
};