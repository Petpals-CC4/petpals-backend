module.exports = (sequelize, DataTypes) => {
  const order_service = sequelize.define('order_service', {
    service_price: {
      type: DataTypes.DECIMAL(10, 2)
    }
  })

  return order_service
}