module.exports = (sequelize, DataTypes) => {
  const bank = sequelize.define('bank', {
    bank_name: {
      type: DataTypes.STRING(255)
    },
    account_name: {
      type: DataTypes.STRING(255)
    },
    account_number: {
      type: DataTypes.STRING(255)
    },
  })

  bank.associate = (models) => {
    bank.belongsTo(models.store, {foreignKey: 'store_id'})
    bank.hasOne(models.order, {foreignKey: 'bank_id'})
  }
  return bank
}