const passport = require("passport");
const { findStoreIDbyUserID } = require("../utils");

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env];
const PROTOCOL = config.protocol
const HOST = config.host
const PORT = config.app_port

const getStoreBio = async (db, req, res) => {
  const store_id = await findStoreIDbyUserID(db, req.user.id);
  const Store = await db.store.findOne({
    where: { id: store_id ? store_id : req.params.store_id },
    attributes: ["id", "store_name", "store_description"],
    include: [
      {
        model: db.store_image,
        attributes: ["image_url"]
      },
      {
        model: db.user,
        attributes: ["profile_image_url"]
      }
    ]
  })
  if (!Store) {
    res.status(404).json({ message: "Not Found" })
  } else {
    let store = { ...Store.dataValues }
    let returnDataStore = {
      id: store.id,
      store_name: store.store_name,
      store_description: store.store_description,
      store_images: store.store_images.map(item => item.image_url),
      profile_image_url: store.user.profile_image_url.includes("http") ? store.user.profile_image_url : `${PROTOCOL}://${HOST}:${PORT}/${store.user.profile_image_url}`
    }
    res.status(200).json(returnDataStore)
  }
}

module.exports = (app, db) => {
  app.get("/store_bio",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => { getStoreBio(db, req, res) }
  )

  app.get("/store_bio/:store_id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => { getStoreBio(db, req, res) }
  )

  app.get("/store/:id", async (req, res) => {
    const Store = await db.store.findOne({
      where: { id: req.params.id },
      attributes: ["id", "store_name", "store_description"],
      include: [
        {
          model: db.feedback,
          attributes: ["id", "rating", "comment", "createdAt"],
          include: [
            {
              model: db.user,
              attributes: ["firstname", "lastname"]
            }
          ]
        },
        {
          model: db.service,
          attributes: [
            "id",
            "service_name",
            "service_description",
            "service_price"
          ]
        },
        {
          model: db.address,
          attributes: [
            "house_no",
            "village_no",
            "road",
            "sub_district",
            "district",
            "province",
            "post_code"
          ]
        },
        {
          model: db.store_image,
          attributes: ["image_url"]
        },
        {
          model: db.user,
          attributes: ["profile_image_url"]
        }
      ]
    })
    if (!Store) {
      res.status(404).json({ message: "Not Found" })
    } else {
      let store = { ...Store.dataValues }
      let scoreArray = store.feedbacks.map(item => item.rating)
      let score = 0.0
      for (let scoreItem of scoreArray) {
        score += scoreItem
      }
      let returnDataStore = {
        id: store.id,
        store_name: store.store_name,
        store_description: store.store_description,
        store_images: store.store_images.map(item => item.image_url),
        address: store.addresses,
        feedback_score: store.feedbacks.length ? score / store.feedbacks.length : 0.0,
        feedback: store.feedbacks.map(item => ({
          id: item.id,
          rating: item.rating,
          comment: item.comment,
          createdAt: item.createdAt,
          fullname: item.user.firstname + " " + item.user.lastname
        })),
        service: store.services,
        profile_image_url: store.user.profile_image_url.includes("http") ? store.user.profile_image_url : `${PROTOCOL}://${HOST}:${PORT}/${store.user.profile_image_url}`
      }
      res.status(200).json(returnDataStore)
    }
  })

  app.put(
    "/store",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      if (store_id !== null) {
        const storeFound = await db.store.findOne({
          where: { id: store_id }
        });
        if (!storeFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          try {
            const store = await storeFound.update({
              store_name: req.body.store_name,
              store_description: req.body.store_description
            });
            console.log(store);
            res
              .status(200)
              .send({ message: "Update Success", ...store.dataValues });
          } catch (error) {
            // res.status(400).send({ message: "store name cannot be empty." })
            res.status(400).send({ message: error.errors[0].message });
          }
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );
};
