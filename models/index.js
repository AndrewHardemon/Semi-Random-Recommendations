const User = require('./User');
const List = require('./List');
const Item = require('./Item');


List.belongsTo(User, {
  foreignKey: 'user_id',
  // onDelete: 'CASCADE'
});

User.hasMany(List, {
  foreignKey: 'user_id',
  // onDelete: 'CASCADE'
});

Item.belongsTo(List, {
  foreignKey: 'list_id',
  // onDelete: 'CASCADE'
});

List.hasMany(Item, {
  foreignKey: 'list_id',
  // onDelete: 'CASCADE'
});


module.exports = {
  User,
  List,
  Item
};