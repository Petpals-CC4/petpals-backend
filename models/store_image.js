module.exports = (sequelize, DataTypes) => {
  const store_image = sequelize.define('store_image', {
    image_url: {
      type: DataTypes.STRING(255)
    }
  })

  store_image.associate = (models) => {
    store_image.belongsTo(models.store, {foreignKey: 'store_id'})
  }
  return store_image
}