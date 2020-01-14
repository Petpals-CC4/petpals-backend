module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
    store_name: {
      type: DataTypes.STRING(255)
    },
    store_description: {
      type: DataTypes.STRING(255)
    }
  })

  store.associate = (models) => {
    store.belongsTo(models.user, {foreignKey: 'user_id'})
    store.hasMany(models.address, {foreignKey: 'store_id'})
    store.hasMany(models.feedback, {foreignKey: 'store_id'})
    store.hasMany(models.order, {foreignKey: 'store_id'})
    store.hasMany(models.store_image, {foreignKey: 'store_id'})
    store.hasMany(models.bank, {foreignKey: 'store_id'})
    store.hasMany(models.service, {foreignKey: 'store_id'})
  }
  return store
}