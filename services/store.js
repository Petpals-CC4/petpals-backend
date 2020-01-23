const passport = require("passport");
module.exports = (app, db) => {
  app.get("/shopdetail/:id", async (req, res) => {
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
    });

    let store = { ...Store.dataValues };
    let scoreArray = store.feedbacks.map(item => item.rating);
    let score = 0.0;
    for (let scoreItem of scoreArray) {
      score += scoreItem;
    }

    let returnDataStore = {
      id: store.id,
      store_name: store.store_name,
      store_description: store.store_description,
      store_images: store.store_images.map(item => item.image_url),
      address: store.addresses,
      feedback_score: store.feedbacks.length
        ? score / store.feedbacks.length
        : 0.0,
      feedback: store.feedbacks.map(item => ({
        id: item.id,
        rating: item.rating,
        comment: item.comment,
        createdAt: item.createdAt,
        fullname: item.user.firstname + " " + item.user.lastname
      })),
      service: store.services,
      profile_image_url: store.user.profile_image_url
    };

    res.status(200).json(returnDataStore);
  });

  app.put(
    "/store/:id",
    passport.authenticate("jwt", { session: false }),

    async (req, res) => {
      const id = req.params.id;
      const user_id = req.user.id;

      const storeFound = await db.store.findOne({
        where: { user_id, id }
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
    }
  );
};
