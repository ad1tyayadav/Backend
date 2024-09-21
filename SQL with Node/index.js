const mysql = require(`mysql2`);
const { faker } = require('@faker-js/faker');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Practice',
    password: 'ADItya@2808'
});

try {
    connection.query("SHOW TABLES", (err, result) => {
        if (err) throw err;
        console.log(result);
    });
} catch (err) {
    console.log(err);
};

connection.end();

let getRandomUser = () => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

