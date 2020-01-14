'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('services', [
        {
            store_id: '1',
            image_url: 'https://img.designswan.com/2018/11/JPGroom/2.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '1',
            image_url: 'https://img.designswan.com/2018/11/JPGroom/4.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '1',
            image_url: 'https://img.designswan.com/2018/11/JPGroom/8.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '2',
            image_url: 'https://img.https://images.unsplash.com/photo-1565726166189-e9814a05ffde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80.com/2018/11/JPGroom/2.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '2',
            image_url: 'https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '2',
            image_url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=660&q=80',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '3',
            image_url: 'https://images.unsplash.com/photo-1564067886520-e1ff2767eb1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '3',
            image_url: 'https://images.unsplash.com/photo-1564067934826-445d6d4e22ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            store_id: '3',
            image_url: 'https://images.unsplash.com/photo-1558236614-17eb9bb2e358?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
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
