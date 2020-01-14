'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('services', [
        {
            store_id: '1',
            service_name: 'รับฝากเลี้ยง',
            service_description: 'บริการรับฝากแบบเช้า-เย็นกลับ หรือ ข้ามคืน ราคาตามเลทจำนวนวันและขนาดของน้อง',
            service_price: '3000',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '1',
            service_name: 'รับดูแลปหมา',
            service_description: 'รับบริการ ดูแลน้องที่ต้องการการดูแลและใส่ใจเป็นพิเศษ และจะจำห้องให้น้องแยกเป็นการส่วนตัว',
            service_price: '4000',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '2',
            service_name: 'รับฝากเลี้ยงหมา',
            service_description: 'รับดูแลน้องหมาด้วยการบริการที่ใส่ใจ',
            service_price: '2000',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '2',
            service_name: 'บริการพาหมาเดินเล่น',
            service_description: 'บริการพาน้องหมาไปเดินเล่น เป็นรายวัน',
            service_price: '300',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '2',
            service_name: 'พาหมาออกกำลังกาย',
            service_description: 'รับบริการออกกำลังกาย สำหรับน้องหมา',
            service_price: '400',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '2',
            service_name: 'ฝึกสอนหมา',
            service_description: 'รับฝึกสอนน้องหมา ให้เรียนรู้คำสั่งเบื้องต้น และสามารถพัฒนาต่อยอดได้',
            service_price: '3000',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '3',
            service_name: 'รับฝากเลี้ยงหมา',
            service_description: 'รับดูแลน้องแทนผู้ปกครอง',
            service_price: '1500',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '3',
            service_name: 'อาบน้ำ',
            service_description: 'อาบน้ำน้องด้วย แชมพูนำเข้า รับประกันว่าน้องไม่มีแพ้',
            service_price: '200',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            store_id: '3',
            service_name: 'ตัดขน แต่งขน',
            service_description: 'ตัดแต่งขนน้องให้สวยงาม บริการประทับใจ',
            service_price: '1500',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '3',
            service_name: 'ตัดเล็บ',
            service_description: 'ใส่ใจทุกรายละเอียด สำหรับเล็บ เพื่อไม่ให้น้องได้รับอันตราย',
            service_price: '100',
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
