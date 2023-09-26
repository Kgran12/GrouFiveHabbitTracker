const sequelize = require('../config/connection');
const { User, Goals } = require('../models');

const userData = require('./userData.json');
const GoalsData = require('./GoalsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Goals of GoalsData) {
    await Goals.create({
      ...Goals,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
