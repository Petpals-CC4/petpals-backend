'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('banks', [
      {
        store: 1,
        bank_name: 'กรุงไทย',
        account_name: 'พอลล่า จับจิต',
        account_number: '1844659857'
      },
      {
        store: 1,
        bank_name: 'ไทยพาณิชย์',
        account_name: 'พอลล่า จับจิต',
        account_number: '9566523585'
      },
      {
        store: 2,
        bank_name: 'กสิกรไทย',
        account_name: 'หรรษา ขย่มโลก',
        account_number: '4481235158'
      },
      {
        store: 2,
        bank_name: 'ไทยพาณิชย์',
        account_name: 'หรรษา ขย่มโลก',
        account_number: '3315846752'
      },
      {
        store: 3,
        bank_name: 'กสิกรไทย',
        account_name: 'สะอาด จริงจริงนะ',
        account_number: '9878524569'
      },
      {
        store: 3,
        bank_name: 'กรุงไทย',
        account_name: 'สะอาด จริงจริงนะ',
        account_number: '4487186485'
      }      
    ])

  }
}