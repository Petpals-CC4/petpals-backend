module.exports = (sequelize, DataTypes) => {
  const guide_text = sequelize.define('guide_text', {
    name: {
      type: DataTypes.STRING(255)
    }
  })

  guide_text.associate = (models) => {
    guide_text.belongsTo(models.user, {foreignKey: 'user_id'})
  }
  return guide_text
}