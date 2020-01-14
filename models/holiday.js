module.exports = (sequelize, DataTypes) => {
  const holiday = sequelize.define('holiday', {
    date: {
      type: DataTypes.DATE
    }
  })

  holiday.associate = (models) => {
    holiday.belongsTo(models.store, {foreignKey: 'store_id'})
  }
  return holiday
}