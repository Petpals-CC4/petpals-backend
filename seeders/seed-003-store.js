'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('stores', [
        {
            user_id: 10,
            store_name: 'น้องพอลล่าร่าเริง',
            store_description: 'ร้านรับดูแลน้องหมาและเยี่ยวยาน้องหมาให้มีสุขภาพจิตที่ดี ดูแลโดยผู้เชี่ยวชาญ',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            user_id: 11,
            store_name: 'หรรษาพาเพลิน',
            store_description: 'บริการพาหมาไปเดินเล่น และรับฝึกสอนน้องให้มีพัฒนาการที่สมบูรณ์',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            user_id: 12,
            store_name: 'สะอาดหมดจด',
            store_description: 'บริการอาบน้ำ และ เสริมสวยให้น้องด้วยผลิตที่เป็นมิตรกับน้องที่สุด',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
    },
  

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
