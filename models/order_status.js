module.exports = (sequelize, DataTypes) => {
  const order_status = sequelize.define('order_status', {
    status_name: {
      type: DataTypes.STRING(255)
    }
  })

  order_status.associate = (models) => {
    order_status.hasMany(models.order, {foreignKey: 'status_id'})
  }
  return order_status
}