module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    password: {
      type: DataTypes.STRING(255)
    },
    firstname: {
      type: DataTypes.STRING(100)
    },
    lastname: {
      type: DataTypes.STRING(100)
    },
    email: {
      type: DataTypes.STRING(100)
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    profile_image_url: {
      type: DataTypes.STRING(255)
    },
    role: {
      type: DataTypes.ENUM("admin", "store", "user")
    },
    status: {
      type: DataTypes.ENUM("active", "banned")
    }
  })

  user.associate = (models) => {
    user.hasOne(models.store, { foreignKey: 'user_id' })
    user.hasMany(models.guide_text, { foreignKey: 'user_id' })
    user.hasMany(models.feedback, { foreignKey: 'user_id' })
    user.hasMany(models.order, { foreignKey: 'user_id' })
  }
  return user
}