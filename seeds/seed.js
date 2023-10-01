const sequelize = require('../config/connection');
const { User, Goals } = require('../models');

const userData = require('./userData.json');
const goalData = require('./goalData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const goal of goalData) {
    await Goals.create({
      ...goal,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
