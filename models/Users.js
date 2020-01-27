module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id:{
      type: DataTypes.UUID,
      primaryKey:true

    },
    first_name:{
      type: DataTypes.STRING,
      isAlphanumeric:true,
      required:true,
      allowNull: false
    },
    last_name:{
      type: DataTypes.STRING,
      isAlphanumeric:true,
      required:true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      required:true,
      allowNull: false,
      len:[8,20]
    },
    password: {
      type: DataTypes.STRING,
      required:true,
      allowNull: false,
      len:[8,20]
    },
    email: {
      type: DataTypes.STRING,
      required:true,
      allowNull: false,
      len:[7,50],
      isEmail:true
    },
    // permission_id:{
    //  // fk in permission table
    //   type:DataTypes.INTEGER,
    //   required:true,
    //   allowNull:false
    // }
    
  });

  return User;
};