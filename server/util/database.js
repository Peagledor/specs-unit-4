require("dotenv").config();
const { Sequelize } = require('sequelize');
const CONNECTION_STRING = process.env.CONNECTION_STRING;


console.log(process.env.CONNECTION_STRING)
console.log(`${CONNECTION_STRING}`)

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres"
});

module.exports = {
    sequelize
}