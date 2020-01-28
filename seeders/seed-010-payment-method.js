'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('payment_methods', [
      {
        store_id: 1,
        payment_name: 'โอนเงินผ่านธนาคาร',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 1,
        payment_name: 'ชำระเงินสด',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 2,
        payment_name: 'โอนเงินผ่านธนาคาร',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 2,
        payment_name: 'ชำระเงินสด',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 3,
        payment_name: 'โอนเงินผ่านธนาคาร',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 3,
        payment_name: 'ชำระเงินสด',
        createdAt: new Date(),
        updatedAt: new Date()  
      }      
    ])

  }
}