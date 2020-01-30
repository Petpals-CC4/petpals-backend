const passport = require("passport");
const { findStoreIDbyUserID } = require("../utils");
const multer = require('multer')
const fs = require('fs');
const dir = './uploads';

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env];
const PROTOCOL = config.protocol
const HOST = config.host
const PORT = config.app_port

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    let imageExtension = file.originalname.split('.').pop();
    let imageName = new Date().getTime() + `.${imageExtension}`;
    cb(null, imageName)
  }
})
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Allowed only .png, .jpg and .jpeg'));
    }
  }
})

module.exports = (app, db, Op) => {
  app.get(
    "/order",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "user") {
        let result = await db.order.findAll({
          include: [
            {
              model: db.payment_method,
              attributes: [
                "payment_name"
              ]
            },
            {
              model: db.bank,
              attributes: [
                "bank_name",
                "account_name",
                "account_number"
              ]
            },
            {
              model: db.order_status,
              attributes: [
                "status_name"
              ]
            },
            {
              model: db.store,
              attributes: [
                "store_name"
              ]
            }
          ],
          where: {
            user_id: req.user.id
          }
        });
        if (!result) {
          res.status(404).send({ message: "Not found order" });
        } else {
          res.status(200).send(result);
        }
      } else {
        const store_id = await findStoreIDbyUserID(db, req.user.id);
        if (store_id !== null) {
          let result = await db.order.findAll({
            include: [
              {
                model: db.payment_method,
                attributes: [
                  "payment_name"
                ]
              },
              {
                model: db.bank,
                attributes: [
                  "bank_name",
                  "account_name",
                  "account_number"
                ]
              },
              {
                model: db.order_status,
                attributes: [
                  "status_name"
                ]
              },
              {
                model: db.user,
                attributes: [
                  "firstname",
                  "lastname",
                  "phone"
                ]
              },
            ],
            where: { store_id }
          });
          if (!result) {
            res.status(404).send({ message: "Order method Not Found" });
          } else {
            res.status(200).send(result);
          }
        } else {
          res.status(401).send({ message: "Unauthorized" });
        }
      }
    }
  );

  app.get(
    "/order/:order_id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "user") {
        let result = await db.order.findOne({
          include: [
            {
              model: db.payment_method,
              attributes: [
                "payment_name"
              ]
            },
            {
              model: db.bank,
              attributes: [
                "bank_name",
                "account_name",
                "account_number"
              ]
            },
            {
              model: db.order_status,
              attributes: [
                "status_name"
              ]
            },
            {
              model: db.store,
              attributes: [
                "store_name",
                "store_description"
              ]
            },
          ],
          where: {
            user_id: req.user.id,
            id: req.params.order_id
          }
        });
        if (!result) {
          res.status(404).send({ message: "Not found order" });
        } else {
          // console.log(result);
          res.status(200).send(result);
        }
      } else {
        const store_id = await findStoreIDbyUserID(db, req.user.id);
        if (store_id !== null) {
          let result = await db.order.findOne({
            include: [
              {
                model: db.payment_method,
                attributes: [
                  "payment_name"
                ]
              },
              {
                model: db.bank,
                attributes: [
                  "bank_name",
                  "account_name",
                  "account_number"
                ]
              },
              {
                model: db.order_status,
                attributes: [
                  "status_name"
                ]
              },
              {
                model: db.store,
                attributes: [
                  "store_name",
                  "store_description"
                ]
              },
            ],
            where: {
              store_id,
              id: req.params.order_id
            }
          });
          if (!result) {
            res.status(404).send({ message: "Order method Not Found" });
          } else {
            res.status(200).send(result);
          }
        } else {
          res.status(401).send({ message: "Unauthorized" });
        }
      }
    }
  );

  app.post(
    "/order",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      ;
      const user_id = req.user.id
      const user_role = req.user.role
      if (user_role === "user") {
        const orderRequest = req.body
        try {
          const createdOrder = await db.order.create({
            user_id,
            bank_id: orderRequest.bank_id,
            store_id: orderRequest.store_id,
            payment_method_id: orderRequest.payment_method_id,
            status_id: 1, // waiting_payment
            start_date: new Date(orderRequest.start_date),
            end_date: new Date(orderRequest.end_date),
            slip_image: null, // at the first in waiting_payment we will not have slip_images
            slip_upload_date: null,
            slip_upload_time: null,
            booking_price: orderRequest.booking_price,
            total_price: orderRequest.total_price
          });
          const orderId = await createdOrder.id;
          console.log(orderId);

          const service_ids = orderRequest.service_ids
          console.log(service_ids); // expect [] type
          for (let index = 0; index < service_ids.length; index++) {
            const findServicePrice = await db.service.findOne({
              where: { id: service_ids[index] },
              attributes: ["service_price"]
            });
            const servicePrice = await findServicePrice.service_price;
            console.log("Service_id:", service_ids[index], "Price:", servicePrice);

            await db.order_service.create({
              service_price: servicePrice,
              service_id: `${service_ids[index]}`,
              order_id: `${orderId}`
            });
          }
          res.status(201).send({ message: "Order Created" })

        } catch (error) {
          res.status(400).send({ message: error })
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  )

  app.delete(
    "/order/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const id = req.params.id;
      const user_id = await req.user.id;
      if (user_id !== null) {
        const orderFound = await db.order.findOne({
          where: { user_id, id }
        });
        if (!orderFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          await orderFound.destroy();
          // console.log(order);
          res.status(200).send({ message: "Delete Success" });
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  // app.post("/uptest", upload.single("slip_image"), async (req, res) => {
  //   res.status(200).send({ message: "Uploaded", file: req.file })
  // })

  app.put(
    "/order_status/reject",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const order_id = req.body.order_id
      if (order_id) {
        const user_id = req.user.id
        if (req.user.role === "user") {
          const order = await db.order.findOne({
            where: {
              id: order_id,
              user_id,
              status_id: 1
            }
          })
          if (!order) {
            res.status(404).send({ message: "Error: Not Found Order" });
          } else {
            await order.update({
              status_id: 4 // Cancelled
            })
            res.status(200).send({ message: "Updated Order Status" })
          }
        } else {
          const store_id = await findStoreIDbyUserID(db, req.user.id);
          const order = await db.order.findOne({
            where: {
              id: order_id,
              store_id,
              status_id: 2
            }
          })
          if (!order) {
            res.status(404).send({ message: "Error: Not Found Order" });
          } else {
            await order.update({
              status_id: 4 // Cancelled
            })
            res.status(200).send({ message: "Updated Order Status" })
          }
        }
      } else {
        res.status(400).send({ message: "Missing Parameter" })
      }
    }
  )

  app.put(
    "/order_status/approve",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const order_id = req.body.order_id
      if (order_id) {
        const user_id = req.user.id
        if (req.user.role === "store") {
          const store_id = await findStoreIDbyUserID(db, user_id);
          const order = await db.order.findOne({
            where: {
              id: order_id,
              store_id,
              status_id: 2
            }
          })
          if (!order) {
            res.status(404).send({ message: "Error: Not Found Order" });
          } else {
            await order.update({
              status_id: 3 // Completed
            })
            res.status(200).send({ message: "Updated Order Status" })
          }
        } else {

        }
      } else {
        res.status(400).send({ message: "Missing Parameter" })
      }
    }
  )

  app.post("/upload_slip_image",
    passport.authenticate("jwt", {
      session: false
    }),
    upload.single("slip_image"),
    async (req, res) => {
      if (req.user.role === "user") {
        const {
          order_id,
          transfer_date,
          transfer_time
        } = req.body
        if (order_id && transfer_date && transfer_time) {
          try {
            // console.log(req.file);
            if (!req.file) {
              res.status(400).send({
                message: "No file uploaded"
              });
            } else {
              let slipImage = req.file;
              const orderUpdated = await db.order.update(
                {
                  slip_image: slipImage.filename,
                  slip_upload_date: transfer_date,
                  slip_upload_time: transfer_time,
                  status_id: 2
                },
                {
                  where: {
                    id: order_id
                  }
                }
              );
              if (!orderUpdated) {
                res.status(404).send({ message: "Error: Not Found" });
              } else {
                console.log(orderUpdated[0]);
                res.status(200).send({
                  message: "Slip image is uploaded",
                  image_url: `${PROTOCOL}://${HOST}:${PORT}/${slipImage.filename}`
                });
              }
            }
          } catch (err) {
            console.log(err);
            res.status(500).send(err);
          }
        } else {
          // console.log(req.file.filename);
          fs.unlinkSync(`${dir}/${req.file.filename}`);
          res.status(400).send({ message: "Bad Request" })
        }
      } else {
        res.status(401).send({ message: "Unauthorized" })
      }
    }
  );

};