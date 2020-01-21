module.exports = (app, db) => {
  app.get("/guidetext", (req, res) => {
    db.guide_text
      .findAll({})
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(400).json({ message: error.message });
      });
  });
};
