const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    for (let i = 0; i < 50; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        passwordHash:await bcrypt.hash('1234', 10),
        profilePicture: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: faker.helpers.arrayElement(['user', 'admin',"teacher"])
      });
    }

    return queryInterface.bulkCreate( users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.truncate();
  }
};
