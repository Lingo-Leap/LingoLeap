const { faker } = require('@faker-js/faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
      const languages = [
        { name: 'English', description: 'English language', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Spanish', description: 'Spanish language', createdAt: new Date(), updatedAt: new Date() },
      ];
  
      return queryInterface.bulkCreate( languages);
    },
  
    down: async (queryInterface, Sequelize) => {
      return queryInterface.truncate();
    }
  };
  