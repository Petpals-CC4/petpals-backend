'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('orders', [
      {
        start_date: '2020-01-15',
        end_date: '2020-01-30',
        slip_image: '',
        booking_price: '900',
        total_price: '3000',
        slip_upload_date: '',
        slip_upload_time: '',
        bank_id: '1',
        user_id: '1',
        store_id: '1',
        status_id: '1',
        payment_method_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        start_date: '2020-01-15',
        end_date: '2020-01-30',
        slip_image: '',
        booking_price: '690',
        total_price: '2300',
        slip_upload_date: '',
        slip_upload_time: '',
        bank_id: '3',
        user_id: '2',
        store_id: '2',
        status_id: '1',
        payment_method_id: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        start_date: '2020-01-15',
        end_date: '2020-01-30',
        slip_image: '',
        booking_price: '990',
        total_price: '3300',
        slip_upload_date: '',
        slip_upload_time: '',
        bank_id: '6',
        user_id: '9',
        store_id: '3',
        status_id: '1',
        payment_method_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        start_date: '2020-01-15',
        end_date: '2020-01-30',
        slip_image: '',
        booking_price: '510',
        total_price: '1700',
        slip_upload_date: '',
        slip_upload_time: '',
        bank_id: '6',
        user_id: '9',
        store_id: '3',
        status_id: '2',
        payment_method_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        start_date: '2020-01-15',
        end_date: '2020-01-30',
        slip_image: '',
        booking_price: '480',
        total_price: '1600',
        slip_upload_date: '',
        slip_upload_time: '',
        bank_id: '6',
        user_id: '9',
        store_id: '3',
        status_id: '3',
        feedback_id: '10',
        payment_method_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        start_date: '2020-01-15',
        end_date: '2020-01-30',
        slip_image: '',
        booking_price: '960',
        total_price: '3200',
        slip_upload_date: '',
        slip_upload_time: '',
        bank_id: '6',
        user_id: '9',
        store_id: '3',
        status_id: '4',
        payment_method_id: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  }
}
