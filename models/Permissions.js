module.exports = (sequelize, DataTypes) => {
    const permission = sequelize.define('permission', {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true

      },
      type:{

          type:DataTypes.STRING,
          required:true,
          allowNull:false
      }
      
      
    });
  
    return permission;
  };
  
  