module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    start_date: {
      type: DataTypes.DATE
    },
    end_date: {
      type: DataTypes.DATE
    },
    slip_image: {
      type: DataTypes.STRING(255)
    },
    booking_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
  })

  order.associate = (models) => {
    order.belongsTo(models.user, {foreignKey: 'user_id'})
    order.belongsTo(models.store, {foreignKey: 'store_id'})
    order.belongsTo(models.order_status, {foreignKey: 'status_id'})
    order.belongsToMany(models.service, {foreignKey: 'service_id', through: 'order_service'})
    order.belongsTo(models.payment_method, {foreignKey: 'payment_method_id'})
  }
  return order
}