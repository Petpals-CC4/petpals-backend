module.exports = (app, db) => {
  app.get("/shopdetail", (req, res) => {
    db.store
      .findOne({
        where: {
          id: req.query.Id
        },
        include: [{
          model: db.feedback
        }]
      })
      .then(result => {
        res.send(result);
      });
  });

  app.get("/shops", async (req, res) => {
    await db.store
      .findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  });


}