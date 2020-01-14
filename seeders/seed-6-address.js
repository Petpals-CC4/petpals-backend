'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('addresses', [
      {
        store: 1,
        house_no: '604/3',
        village_no: '',
        road: 'เพชรบุรี',
        sub_district: 'ถนนเพชรบุรี',
        district: 'เขตราชเทวี',
        province: 'กรุงเทพมหานคร',
        post_code: '10400'
      },
      {
        store: 2,
        house_no: '50',
        village_no: '',
        road: 'งามวงศ์วาน',
        sub_district: 'ลาดยาว',
        district: 'เขตจตุจักร',
        province: 'กรุงเทพมหานคร',
        post_code: '10900'
      },
      {
        store: 3,
        house_no: '400',
        village_no: '',
        road: 'ลาซาลแขวง',
        sub_district: 'บางนา',
        district: 'เขตบางนา',
        province: 'กรุงเทพมหานคร',
        post_code: '10260'
      }     
    ])

  }
}