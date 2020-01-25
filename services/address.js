const passport = require("passport");
const { findStoreIDbyUserID } = require("../utils");

module.exports = (app, db) => {
  app.get(
    "/address",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        let result = await db.address.findAll({
          where: {
            store_id
          }
        });
        if (!result) {
          res.status(404).send({ message: "Not found address by store id" });
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.post(
    "/address",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        let result = await db.address.create({
          house_no: req.body.house_no,
          village_no: req.body.village_no,
          road: req.body.road,
          sub_district: req.body.sub_district,
          district: req.body.district,
          province: req.body.province,
          post_code: req.body.post_code,
          store_id
        });
        if (!result) {
          res.status(400).json({
            message: "Cannot Create Address, please check your body request"
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
    "/address/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const addressFound = await db.address.findOne({
          where: { store_id, id }
        });
        if (!addressFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          try {
            const address = await addressFound.update({
              house_no: req.body.house_no,
              village_no: req.body.village_no,
              road: req.body.road,
              sub_district: req.body.sub_district,
              district: req.body.district,
              province: req.body.province,
              post_code: req.body.post_code
            });
            // console.log(address);
            res
              .status(200)
              .send({ message: "Update Success", ...address.dataValues });
          } catch (error) {
            // res.status(400).send({ message: "address name cannot be empty." })
            res.status(400).send({ message: error.errors[0].message });
          }
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.delete(
    "/address/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const addressFound = await db.address.findOne({
          where: { store_id, id }
        });
        if (!addressFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          await addressFound.destroy();
          // console.log(address);
          res.status(200).send({ message: "Delete Success" });
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );
};
