const passport = require("passport");
const { findStoreIDbyUserID } = require("../utils");

module.exports = (app, db) => {
  app.get(
    "/payment_method/:store_id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "user") {
        let result = await db.payment_method.findAll({
          where: {
            store_id: req.params.store_id
          },
          attributes: ["id", "payment_name"]
        });
        if (!result) {
          res
            .status(404)
            .send({ message: "Not found payment_method by store id" });
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(401).send({
          message: "Unauthorized"
        });
      }
    }
  );

  app.get(
    "/payment_method",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        let result = await db.payment_method.findAll({
          where: { store_id },
          attributes: ["id", "payment_name"]
        });
        if (!result) {
          res.status(404).send({ message: "Payment method Not Found" });
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.post(
    "/payment_method",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const result = await db.payment_method.create({
          payment_name: req.body.payment_name,
          store_id
        });
        if (!result) {
          res.status(400).json({
            message:
              "Cannot Create Payment method, please check your body request"
          });
        } else {
          res.status(201).json(result);
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.put(
    "/payment_method/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const payment_methodFound = await db.payment_method.findOne({
          where: { store_id, id }
        });
        if (!payment_methodFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          try {
            const payment_method = await payment_methodFound.update({
              payment_name: req.body.payment_name
            });
            // console.log(payment_method);
            res.status(200).send({
              message: "Update Success",
              ...payment_method.dataValues
            });
          } catch (error) {
            res.status(400).send({ message: error.errors[0].message });
          }
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.delete(
    "/payment_method/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const payment_methodFound = await db.payment_method.findOne({
          where: { store_id, id }
        });
        if (!payment_methodFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          await payment_methodFound.destroy();
          // console.log(payment_method);
          res.status(200).send({ message: "Delete Success" });
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );
};
