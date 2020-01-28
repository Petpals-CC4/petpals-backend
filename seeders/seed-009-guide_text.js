'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('guide_texts', [
      {
        name: 'อาบน้ำ',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 13
      },
      {
        name: 'ตัดขน',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 13
      },
      {
        name: 'รับฝากเลี้ยง',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 13
      },
      {
        name: 'ออกกำลัง',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 13
      },
      {
        name: 'หาคู่',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 13
      },
      {
        name: 'ตัดเล็บ',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 13
      },
      {
        name: 'ฝึกสอน',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: 13
      }
    ])

  }
}