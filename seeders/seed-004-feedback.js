'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('feedbacks', [
      {
        user_id: 1,
        store_id: 1,
        rating: 5,
        comment: 'ร้านดูแลน้องดีมากเลยครับ ถึงน้องจะอายุมากและขี้หงุดหงิดทางร้านก็สามารถเข้ากับน้องได้อย่างดี',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        store_id: 1,
        rating: 5,
        comment: 'ร้านนี้ดีมากเลยครับ ไปรับน้องมา น้องร่าเริงมาก',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        store_id: 1,
        rating: 2,
        comment: 'ผมไม่โอเคเลย ร้านดูแลยังไง ให้น้องทะเลาะกัน จนมีแผล',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        store_id: 2,
        rating: 4,
        comment: 'ร้านฝึกน้องให้มีระเบียบดีมากครับ หลังจากรับน้องมาน้องไม่ดื้อไม่ซนเลย',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        store_id: 2,
        rating: 4,
        comment: 'ร้านฝึกน้องให้มีระเบียบดีมากครับ หลังจากรับน้องมาน้องไม่ดื้อไม่ซนเลย',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        store_id: 2,
        rating: 5,
        comment: 'ที่นี่ดูแลน้องดีมากค่ะ อัพเดตตลอดเลย ราคาไม่แพงมากด้วยนะคะ แนะนำค่ะ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 6,
        store_id: 2,
        rating: 5,
        comment: 'รักสุนัขจริงๆ สถานที่สะอาด ดูแลดี ราคาเหมาะสม ... ต้องไปรบกวนอีกในโอกาสต่อๆไปครับ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 7,
        store_id: 3,
        rating: 5,
        comment: 'ขอบคุณครับ ที่ดูแลโกโก้กับลัคกี้เป็นอย่างดี เด็ก ๆ เป็นหมาไทยไม่ค่อยกล้าจะฝากใคร แต่ที่หมาซนมีวิธีทำให้เค้าไม่เครียด เวลาได้ไปวิ่งเล่น ดูมีความสุขมากครับ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        store_id: 3,
        rating: 5,
        comment: 'ห้องฝากน้องสะอาดครับ ออนซอน ก๋วยจี๊ ดูมีความสุขที่ได้มาฝากเลี้ยง กระดี๊กระด๊า ไม่หงอยเลยครับ อิอิ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 9,
        store_id: 3,
        rating: 2,
        comment: 'บริการดีมากครับ ตัดขนให้น้องออกมาดูดีมากเลย มีกล้องวงจรปิดให้ดูน้องได้ด้วย อุ่นใจมากๆ',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

  }
}