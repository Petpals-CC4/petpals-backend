module.exports = (app, db) => {
  app.get("/guide_text", async (req, res) => {
    const result = await db.guide_text.findAll({})
    if (!result) {
      res.status(400).json({ message: error.message });
    } else {
      let resultMapped = await result.map(item => item.name)
      res.status(200).json(resultMapped);
    }
  });
};
