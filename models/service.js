module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define('service', {
    service_name: {
      type: DataTypes.STRING(255)
    },
    service_description: {
      type: DataTypes.STRING(255)
    },
    service_price: {
      type: DataTypes.DECIMAL(10, 2)
    }
  })

  service.associate = (models) => {
    service.belongsTo(models.store, {foreignKey: 'store_id'})
    service.belongsToMany(models.order, {foreignKey: 'service_id', through: 'order_service'})
  }
  return service
}