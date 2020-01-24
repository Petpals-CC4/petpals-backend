const passport = require("passport");
const { findStoreIDbyUserID } = require("../utils");

module.exports = (app, db, Op) => {
  app.get("/landingpage", async (req, res) => {
    const topListStore = await db.store.findAll({
      attributes: ["id", "store_name", "store_description"],
      include: [
        {
          model: db.user,
          attributes: ["profile_image_url"]
        },
        {
          model: db.feedback,
          attributes: ["rating"]
        },
        {
          model: db.address,
          attributes: [
            "id",
            "house_no",
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
          model: db.service,
          attributes: ['id', 'service_name', 'service_description']
        }
      ]
    });
    if (topListStore) {
      const newTopListStore = await topListStore.map(list => {
        let feedbackSummary = list.feedbacks.reduce(
          (sum, curr) => (sum += curr.rating),
          0
        );
        return {
          id: list.id,
          store_name: list.store_name,
          store_description: list.store_description,
          store_images: list.store_images.map(item => item.image_url),
          services: list.services,
          profile_image_url: list.user.profile_image_url,
          feedback_score: feedbackSummary / list.feedbacks.length
        };
      });
      res.status(200).json(newTopListStore);
    } else {
      res.status(404).json({ message: "Store Not Found" });
    }
  });

  app.get(
    "/service",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      let result = await db.service.findAll({
        where: {
          store_id
        }
      });
      if (!result) {
        res.status(404).send({ message: "Not found service by store id" });
      } else {
        res.status(200).send(result);
      }
    }
  )

  app.post('/service/search', async (req, res) => {
    const searchInputField = {
      searchText: req.body.searchText,
    }
    const storeList = await db.store.findAll({
      attributes: ["id", "store_name", "store_description"],
      include: [
        {
          model: db.user,
          attributes: ["profile_image_url"]
        },
        {
          model: db.feedback,
          attributes: ['rating']
        },
        // {
        //   model: db.address,
        //   attributes: ['id', 'house_no', 'road', 'sub_district', 'district', 'province', 'post_code']
        // },
        // {
        //   model: db.store_image,
        //   attributes: ['image_url']
        // },
        {
          model: db.service,
          attributes: [
            "id",
            "service_name",
            "service_description",
            "service_price"
          ],
          where: {
            service_name: {
              [Op.substring]: searchInputField.searchText
            }
          }
        }
      ]
    });
    const newStoreList = await storeList.map(list => {
      // return list
      let feedbackSummary = list.feedbacks.reduce(
        (sum, curr) => (sum += curr.rating),
        0
      );
      return {
        id: list.id,
        store_name: list.store_name,
        store_description: list.store_description,
        services: list.services,
        profile_image_url: list.user.profile_image_url,
        feedback_score: list.feedbacks.length > 0 ? (feedbackSummary / list.feedbacks.length).toFixed(2) : 0,
      }
    });
  })

  app.post(
    "/service",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      await db.service
        .create({
          service_name: req.body.service_name,
          service_description: req.body.service_description,
          service_price: req.body.service_price,
          store_id
        })
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          console.error(err);
          res.status(400).json({
            message: err.message
          });
        });
    }
  );

  app.put(
    "/service/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);
      const serviceFound = await db.service.findOne({
        where: { store_id, id }
      });
      if (!serviceFound) {
        res.status(404).send({ message: "Error: Not Found" });
      } else {
        try {
          const service = await serviceFound.update({
            service_name: req.body.service_name,
            service_description: req.body.service_description,
            service_price: req.body.service_price
          });
          console.log(service);
          res
            .status(200)
            .send({ message: "Update Success", ...service.dataValues });
        } catch (error) {
          // res.status(400).send({ message: "service name cannot be empty." })
          res.status(400).send({ message: error.errors[0].message });
        }
      }
    }
  );

  app.delete(
    "/service/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id = req.params.id;
      const store_id = await findStoreIDbyUserID(db, req.user.id);

      const serviceFound = await db.service.findOne({
        where: { store_id, id }
      });
      if (!serviceFound) {
        res.status(404).send({ message: "Error: Not Found" });
      } else {
        const service = await serviceFound.destroy();
        console.log(service);
        res.status(200).send({ message: "Delete Success" });
      }
    }
  );
};
