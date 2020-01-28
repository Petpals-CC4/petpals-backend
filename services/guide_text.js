const passport = require("passport");

module.exports = (app, db) => {
  app.get("/guide_text", async (req, res) => {
    const result = await db.guide_text.findAll({});
    if (!result) {
      res.status(400).json({ message: error.message });
    } else {
      let resultMapped = await result.map(item => item.name);
      res.status(200).json(resultMapped);
    }
  });

  app.post(
    "/guide_text",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "admin") {
        let result = await db.guide_text.create({
          name: req.body.name,
          user_id: req.user.id
        });
        if (!result) {
          res.status(400).json({
            message: "Cannot Guide text, please check your body request"
          });
        } else {
          res.status(201).json(result);
        }
      } else {
        res.status(401).send({
          message: "Unauthorized"
        });
      }
    }
  );

  app.put(
    "/guide_text/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id = req.params.id;
      if (req.user.role === "admin") {
        const guide_textFound = await db.guide_text.findOne({
          where: { id }
        });
        if (!guide_textFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          try {
            const guide_text = await guide_textFound.update({
              name: req.body.name
            });
            // console.log(guide_text);
            res
              .status(200)
              .send({ message: "Update Success", ...guide_text.dataValues });
          } catch (error) {
            // res.status(400).send({ message: "guide_text name cannot be empty." })
            res.status(400).send({ message: error.errors[0].message });
          }
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.delete(
    "/guide_text/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const id = req.params.id;
      if (req.user.role === "admin") {
        const guide_textFound = await db.guide_text.findOne({
          where: { id }
        });
        if (!guide_textFound) {
          res.status(404).send({ message: "Error: Not Found" });
        } else {
          await guide_textFound.destroy();
          // console.log(guide_text);
          res.status(200).send({ message: "Delete Success" });
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );
};
