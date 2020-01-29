module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define('address', {
    house_no: {
      type: DataTypes.STRING(255)
    },
    village_no: {
      type: DataTypes.STRING(255)
    },
    road: {
      type: DataTypes.STRING(255)
    },
    sub_district: {
      type: DataTypes.STRING(255)
    },
    district: {
      type: DataTypes.STRING(255)
    },
    province: {
      type: DataTypes.STRING(255)
    },
    post_code: {
      type: DataTypes.INTEGER
    },
  })

  address.associate = (models) => {
    address.belongsTo(models.store, {foreignKey: 'store_id'})
  }
  return address
}