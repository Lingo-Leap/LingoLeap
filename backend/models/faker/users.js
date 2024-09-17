const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    for (let i = 0; i < 50; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        passwordHash: faker.internet.password(),
        profilePicture: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkCreate( users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.truncate();
  }
};
