'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('order_services', [
      {
        service_id: '1',
        service_price: '3000',
        order_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '3',
        service_price: '2000',
        order_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '4',
        service_price: '300',
        order_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '7',
        service_price: '1500',
        order_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '8',
        service_price: '200',
        order_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '9',
        service_price: '1500',
        order_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '10',
        service_price: '100',
        order_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '7',
        service_price: '1500',
        order_id: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '8',
        service_price: '200',
        order_id: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '9',
        service_price: '1500',
        order_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '10',
        service_price: '100',
        order_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '7',
        service_price: '1500',
        order_id: '6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '8',
        service_price: '200',
        order_id: '6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        service_id: '9',
        service_price: '1500',
        order_id: '6',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  }
}