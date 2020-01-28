'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('banks', [
      {
        store_id: 1,
        bank_name: 'ธนาคารกรุงไทย',
        account_name: 'พอลล่า จับจิต',
        account_number: '1844659857',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 1,
        bank_name: 'ธนาคารไทยพาณิชย์',
        account_name: 'พอลล่า จับจิต',
        account_number: '9566523585',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 2,
        bank_name: 'ธนาคารกสิกรไทย',
        account_name: 'หรรษา ขย่มโลก',
        account_number: '4481235158',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 2,
        bank_name: 'ธนาคารไทยพาณิชย์',
        account_name: 'หรรษา ขย่มโลก',
        account_number: '3315846752',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 3,
        bank_name: 'ธนาคารกสิกรไทย',
        account_name: 'สะอาด จริงจริงนะ',
        account_number: '9878524569',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        store_id: 3,
        bank_name: 'ธนาคารกรุงไทย',
        account_name: 'สะอาด จริงจริงนะ',
        account_number: '4487186485',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

  }
}