const passport = require("passport");
const { findStoreIDbyUserID } = require("../utils");

module.exports = (app, db) => {
  app.get(
    "/store_image",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const store_image = await db.store_image.findAll({
          where: { store_id },
          attributes: ["id", "image_url"]
        });
        if (!store_image) {
          res.status(404).json({ message: "Image Not Found" });
        } else {
          const newimageLean = await store_image.map(list => {
            return list.image_url;
          });
          res.status(200).json(newimageLean);
        }
      } else {
        res.status(401).send({ message: "Unauthorized" })
      }
    }
  );

  app.post(
    "/store_image",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const result = await db.store_image.create({
          image_url: req.body.image_url,
          store_id
        })
        if (!result) {
          res.status(400).json({ message: "Cannot Create Store Image, please check your body request" });
        } else {
          res.status(201).json(result);
        }
      } else {
        res.status(401).send({ message: "Unauthorized" })
      }
    }
  );

  app.put(
    "/store_image/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const storeImageFound = await db.store_image.findOne({
          where: { store_id, id }
        });
        if (!storeImageFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          try {
            const store_image = await storeImageFound.update({
              image_url: req.body.image_url
            });
            // console.log(store_image);
            res.status(200).send({ message: "Update Success", ...store_image.dataValues });
          } catch (error) {
            res.status(400).send({ message: error.errors[0].message });
          }
        }
      } else {
        res.status(401).send({ message: "Unauthorized" })
      }
    }
  );

  app.delete(
    "/store_image/:id",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const storeImageFound = await db.store_image.findOne({
          where: { store_id, id }
        });
        if (!storeImageFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          await storeImageFound.destroy();
          // console.log(store_image);
          res.status(200).send({ message: "Delete Success" });
        }
      } else {
        res.status(401).send({ message: "Unauthorized" })
      }
    }
  );
};
