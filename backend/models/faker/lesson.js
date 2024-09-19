const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lessons = [];

    for (let i = 0; i < 20; i++) {
      lessons.push({
        title: faker.lorem.words(3),
        content: faker.lorem.paragraph(),
        isCompleted: false,
        level: faker.number.int({ min: 1, max: 5 }),
        type: faker.helpers.arrayElement(["multiple", "order"]),
        languageId: faker.number.int({ min: 1, max: 2 }), // Adjust based on your language seed
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkCreate(lessons);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.truncate();
  },
};
