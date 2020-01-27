module.exports = (sequelize, DataTypes) => {
  const payment_method = sequelize.define('payment_method', {
    payment_name:{
      type:DataTypes.STRING(255)
    }
  })
  payment_method.associate = (models) => {
    payment_method.hasOne(models.order, { foreignKey: 'payment_method_id'})
    payment_method.belongsTo(models.store, { foreignKey: 'store_id' })
  }

  return payment_method
}