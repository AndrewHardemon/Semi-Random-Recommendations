const User = require('./User');
const Post = require('./Post');


Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});


module.exports = {
  User,
  Post
};