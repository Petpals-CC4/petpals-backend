"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        password: "sommaipass",
        firstname: "สมหมาย",
        lastname: "ร่าเริง",
        email: "sommai@gmail.com",
        phone: "0998887771",
        profile_image_url: "https://img.icons8.com/plasticine/2x/user.png",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: "sompongpass",
        firstname: "สมปอง",
        lastname: "หมายมั่น",
        email: "sompong@gmail.com",
        phone: "0998887772",
        profile_image_url:
          "https://icons-for-free.com/iconfiles/png/512/casual+male+man+person+user+icon-1320196226197493271.png",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: "kayanpass",
        firstname: "ขยัน",
        lastname: "ขันแข็ง",
        email: "kayanpass@gmail.com",
        phone: "0998887773",
        profile_image_url:
          "https://upload.wikimedia.org/wikipedia/commons/3/38/Wikipedia_User-ICON_byNightsight.png",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: "rangdeepass",
        firstname: "แรงดี",
        lastname: "ไม่มีหมด",
        email: "rangdee@gmail.com",
        phone: "0998887774",
        profile_image_url:
          "https://cdn1.iconfinder.com/data/icons/character-2/107/8-512.png",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: "jintalapass",
        firstname: "จินตลา",
        lastname: "พาเพลิน",
        email: "jintala@gmail.com",
        phone: "0998887775",
        profile_image_url:
          "https://cdn1.iconfinder.com/data/icons/character-2/240/19-512.png",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: "chateepass",
        firstname: "ชาตรี",
        lastname: "รสเข็ม",
        email: "chatee@gmail.com",
        phone: "0998887776",
        profile_image_url:
          "https://cdn3.vectorstock.com/i/1000x1000/44/02/happy-young-man-smile-profile-cartoon-character-vector-18864402.jpg",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: "sekpass",
        firstname: "เสก",
        lastname: "โลโซ",
        email: "sek@gmail.com",
        phone: "0998887777",
        profile_image_url:
          "https://cdn2.vectorstock.com/i/1000x1000/28/96/young-man-face-cartoon-design-vector-9772896.jpg",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: "ponlawatpass",
        firstname: "พลวัต",
        lastname: "เอี่ยมสุข",
        email: "ponlawat@gmail.com",
        phone: "0998887778",
        profile_image_url:
          "https://cdn3.vectorstock.com/i/1000x1000/90/17/indian-man-face-avatar-cartoon-vector-25919017.jpg",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password:
          "$2a$11$DkmGpgc.cskXkOv39cMx6.Kn0yDhNldqjN70qeUWCitXlsX6Y2d8q", // hansapass
        firstname: "เจมส์",
        lastname: "หาญกล้า",
        email: "user",
        phone: "0998887779",
        profile_image_url:
          "https://making-the-web.com/sites/default/files/clipart/148583/cartoon-man-face-148583-7316849.jpg",
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password:
          "$2a$11$DkmGpgc.cskXkOv39cMx6.Kn0yDhNldqjN70qeUWCitXlsX6Y2d8q", // hansapass
        firstname: "บังอร",
        lastname: "หาญชัย",
        email: "user_banned",
        phone: "0998887779",
        profile_image_url:
          "https://making-the-web.com/sites/default/files/clipart/148583/cartoon-man-face-148583-7316849.jpg",
        role: "user",
        status: "banned",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: "$11$w4/uO74OL.auGBooPqiGk.AUVQWAu8tnLNPWVeEGxgecqCV4arm0i", //ponraapass
        firstname: "พอลล่า",
        lastname: "จับจิต",
        email: "ponraa@gmail.com",
        phone: "0998887780",
        profile_image_url:
          "https://cdn1.vectorstock.com/i/1000x1000/06/45/man-face-pop-art-cartoon-vector-19080645.jpg",
        role: "store",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password:
          "$2a$11$DkmGpgc.cskXkOv39cMx6.Kn0yDhNldqjN70qeUWCitXlsX6Y2d8q", //hansapass
        firstname: "หรรษา",
        lastname: "ขย่มโลก",
        email: "hansa@gmail.com",
        phone: "0998887781",
        profile_image_url:
          "https://previews.123rf.com/images/farhad73/farhad731807/farhad73180700006/104271850-man-cartoon-face-with-glasses-vector-illustration-.jpg",
        role: "store",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password:
          "$2a$11$jWOF2TC1pwxLSIg97i2DquxS6q9ySSMJm6sa8vk6d/3vEZMSokae.", //saadpass
        firstname: "สะอาด",
        lastname: "จริงจริงนะ",
        email: "saad@gmail.com",
        phone: "0998887782",
        profile_image_url:
          "https://cdn4.vectorstock.com/i/1000x1000/77/43/young-man-head-avatar-cartoon-face-character-vector-21757743.jpg",
        role: "store",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password:
          "$2a$11$DkmGpgc.cskXkOv39cMx6.Kn0yDhNldqjN70qeUWCitXlsX6Y2d8q", //hansapass
        firstname: "บังคม",
        lastname: "ใสสะอาด",
        email: "bung@gmail.com",
        phone: "0998887782",
        profile_image_url:
          "https://cdn4.vectorstock.com/i/1000x1000/77/43/young-man-head-avatar-cartoon-face-character-vector-21757743.jpg",
        role: "store",
        status: "banned",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password:
          "$2a$11$W8a7KBOzLyZC/n38ZoKeI.KvE0nxo/QxVdkC3azGEFYPj3FQBp26y", //admin
        firstname: "Wat",
        lastname: "Size",
        email: "admin",
        phone: "081xxx1981",
        profile_image_url:
          "https://f.ptcdn.info/496/043/000/o8oqydgre871QE9ii7m-o.jpg",
        role: "admin",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }

  // down: (queryInterface, Sequelize) => {
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
};
