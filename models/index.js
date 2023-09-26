const User = require('./User');
const Goals = require('./Goals');

User.hasMany(Goals, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Goals.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Goals};
