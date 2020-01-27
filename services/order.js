const passport = require("passport");
const { findStoreIDbyUserID } = require("../utils");

module.exports = (app, db, Op) => {
  app.post("/shopdetail/:id/payment", async (req, res) => {
    try {
      const orderRequest = {
        user_id: req.body.user_id,
        store_id: req.params.id,
        service_id: req.body.service_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        payment_name: req.body.payment_name,
        booking_price: req.body.booking_price,
        total_price: req.body.total_price
      };

      //flow to create order-service

      //1. crate OrderStatus
      const createOrderStatus = await db.order_status.create({
        status_name: "willing_payment"
      });
      const orderStatusId = await createOrderStatus.id;

      //2. create PaymentMethod
      const createPaymentMethod = await db.payment_method.create({
        payment_name: orderRequest.payment_name
      });
      const paymentMethodId = await createPaymentMethod.id;

      //3. use orderId and paymentId to create order
      const createOrder = await db.order.create({
        user_id: orderRequest.user_id,
        store_id: orderRequest.store_id,
        payment_method_id: Number(paymentMethodId),
        status_id: orderStatusId,
        start_date: orderRequest.start_date,
        end_date: orderRequest.end_date,
        slip_image: null,
        booking_price: orderRequest.booking_price,
        total_price: orderRequest.total_price
      });
      const orderId = await createOrder.id;
      console.log(orderId);
      console.log(orderRequest.service_id);

      // 4. find service-price and use orderId to creat orderService

      const findServicePrice = await db.service.findOne({
        where: { id: orderRequest.service_id },
        attributes: ["service_price"]
      });
      const servicePrice = await findServicePrice.service_price;
      console.log(servicePrice);

      // !!!bug cant create order service
      const createOrderService = await db.order_service.create({
        service_price: 4000,
        service_id: `${orderRequest.service_id}`,
        order_id: `${orderId}`
      });

      res.json("success");
    } catch (err) {
      res.json(err.message);
    }
  });

  app.put("/shopdetail/:id/verifypayment/:order_id", async (req, res) => {
    try {
      const uploadRequest = {
        order_id: req.params.order_id,
        slip_image: req.body.slip_image
      };

      const successUpload = await db.order.update(
        {
          slip_image: uploadRequest.slip_image
        },
        {
          where: {
            id: uploadRequest.order_id
          }
        }
      );

      const order = await db.order.findOne({
        where: { id: uploadRequest.order_id },
        attributes: ["status_id"]
      });
      const orderStatusId = order.status_id;

      const updateOrderStatus = await db.order_status.update(
        {
          status_name: "payment_verify"
        },
        {
          where: { id: orderStatusId }
        }
      );

      res.status(201).json("payment success");
    } catch (err) {
      res.status(201).json(err.message);
    }
  });

  app.get( 
    "/order",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "user") {
        let result = await db.order.findAll({
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
};
