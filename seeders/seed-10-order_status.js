'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('order_statuses', [
      {
        status_name: 'waiting_payment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_name: 'waiting_verify',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_name: 'completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_name: 'cancelled',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

  }
}