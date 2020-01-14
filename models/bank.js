module.exports = (sequelize, DataTypes) => {
  const bank = sequelize.define('bank', {
    bank_name: {
      type: DataTypes.STRING(255)
    },
    account_name: {
      type: DataTypes.STRING(255)
    },
    account_number: {
      type: DataTypes.INTEGER
    },
  })

  bank.associate = (models) => {
    bank.belongsTo(models.store, {foreignKey: 'store_id'})
  }
  return bank
}