const Sequelize = require('sequelize');

/*const config = {
    host     : process.env.DB_HOST,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE 
}*/

const config = {
    host     : "localhost",
    username : "admin",
    password : "admin",
    database : "consolidacion"
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({alter: true});
        console.log('Tables created.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize