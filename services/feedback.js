const passport = require('passport');

module.exports = (app, db) => {
  app.get("/feedback_random",
    async (req, res) => {
      let feedbacks = await db.feedback.findAll({
        attributes: ["id", "rating", "comment"],
        include: [
          {
            model: db.store,
            attributes: ['id', 'store_name']
          },
          {
            model: db.user,
            attributes: ['firstname', 'lastname']
          }
        ]
      });
      if (!feedbacks) {
        res.status(404).send({ message: "Not found Feedback" });
      } else {
        let uniqID = {}
        let feedbacksLean = await feedbacks.filter((feedback) => {
          if (uniqID[feedback.store.dataValues.id]) return false
          uniqID[feedback.store.dataValues.id] = true
          return true
        }).map((feedback) => {
          return {
            id: feedback.id,
            rating: feedback.rating,
            comment: feedback.comment,
            storeName: feedback.store.dataValues.store_name,
            customerName: feedback.user.dataValues.firstname + " " + feedback.user.dataValues.lastname
          }
        })
        let maxLen = feedbacksLean.length
        let randomIndex = [];
        while (randomIndex.length < 3 && randomIndex.length < maxLen) {
          let randVal = Math.floor(Math.random() * maxLen)
          if (randomIndex.indexOf(randVal) === -1) randomIndex.push(randVal)
        }
        res.status(200).send(feedbacksLean.filter((_, index) => randomIndex.indexOf(index) > -1));
      }
    }
  )

  app.get("/feedback",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const user_id = req.user.id
      let feedbacks = await db.feedback.findAll({
        where: {
          user_id
        },
        attributes: ["id", "rating", "comment", "updatedAt"],
        include: [
          {
            model: db.store,
            attributes: ['store_name']
          }
        ]
      });
      if (!feedbacks) {
        res.status(404).send({ message: "Not found Feedback by store id" });
      } else {
        let feedbacksLean = await feedbacks.map((feedback) => {
          return {
            id: feedback.id,
            rating: feedback.rating,
            comment: feedback.comment,
            updatedAt: feedback.updatedAt,
            storeName: feedback.store.dataValues.store_name
          }
        })
        res.status(200).send(feedbacksLean);
      }
    }
  )

  app.get("/feedback_store/:store_id",
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      let feedbacks = await db.feedback.findAll({
        where: {
          store_id: req.params.store_id
        },
        attributes: ["id", "rating", "comment", "updatedAt"],
        include: [
          {
            model: db.user,
            attributes: ['firstname', 'lastname']
          }
        ]
      });
      if (!feedbacks) {
        res.status(404).send({ message: "Not found Feedback by store id" });
      } else {
        let feedbacksLean = await feedbacks.map((feedback) => {
          return {
            id: feedback.id,
            rating: feedback.rating,
            comment: feedback.comment,
            updatedAt: feedback.updatedAt,
            customerName: feedback.user.dataValues.firstname + " " + feedback.user.dataValues.lastname
          }
        })
        res.status(200).send(feedbacksLean);
      }
    }
  )
}