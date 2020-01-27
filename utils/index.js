module.exports = {
  findStoreIDbyUserID: async (db, user_id) => {
    const storeDetail = await db.store.findOne({
      where: { user_id },
      attributes: ["id"]
    });
    if (!storeDetail) {
      // console.error("Not Found Store ID by User ID", user_id)
      return null
    } else {
      // console.log("Store ID:", storeDetail.dataValues.id)
      return storeDetail.dataValues.id
    }
  }
}