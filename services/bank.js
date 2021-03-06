const passport = require("passport");
const { findStoreIDbyUserID } = require("../utils");

module.exports = (app, db) => {
  app.get("/bank/:store_id", async (req, res) => {
    let result = await db.bank.findAll({
      where: {
        store_id: req.params.store_id
      }
    });
    if (!result) {
      res.status(404).send({ message: "Not found Bank by store id" });
    } else {
      res.status(200).send(result);
    }
  });

  app.get(
    "/bank",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        let result = await db.bank.findAll({
          where: {
            store_id
          }
        });
        if (!result) {
          res.status(404).send({ message: "Not found bank by store id" });
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.post(
    "/bank",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        let result = await db.bank.create({
          bank_name: req.body.bank_name,
          account_name: req.body.account_name,
          account_number: req.body.account_number,
          store_id
        });
        if (!result) {
          res.status(400).json({
            message: "Cannot Bank, please check your body request"
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
    "/bank/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const bankFound = await db.bank.findOne({
          where: { store_id, id }
        });
        if (!bankFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          try {
            const bank = await bankFound.update({
              bank_name: req.body.bank_name,
              account_name: req.body.account_name,
              account_number: req.body.account_number
            });
            // console.log(bank);
            res
              .status(200)
              .send({ message: "Update Success", ...bank.dataValues });
          } catch (error) {
            // res.status(400).send({ message: "bank name cannot be empty." })
            res.status(400).send({ message: error.errors[0].message });
          }
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.delete(
    "/bank/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const bankFound = await db.bank.findOne({
          where: { store_id, id }
        });
        if (!bankFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          await bankFound.destroy();
          // console.log(bank);
          res.status(200).send({ message: "Delete Success" });
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );
};
