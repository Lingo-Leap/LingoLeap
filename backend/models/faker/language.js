const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const languages = [
      {
        name: 'English',
        description: 'English language',
        languagePicture: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Spanish', 
        description: 'Spanish language',
        
        languagePicture: faker.image.avatar(), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

 
    console.log('Languages to be seeded:', languages);

    try {
      return await queryInterface.bulkCreate( languages);
    } catch (error) {
      console.error('Error during bulkCreate:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.truncate();
  },
};
