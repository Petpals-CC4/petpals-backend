module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define('feedback', {
    rating: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING(255)
    }
  })

  feedback.associate = (models) => {
    feedback.belongsTo(models.user, {foreignKey: 'user_id'})
    feedback.belongsTo(models.store, {foreignKey: 'store_id'})
    feedback.hasOne(models.order, {foreignKey: 'feedback_id'})
  }
  return feedback
}