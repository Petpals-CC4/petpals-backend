module.exports = (app, db) => {
  app.get("/bank/:store_id", (req, res) => {
    db.store
      .findOne({
        where: {
          id: req.params.store_id
        },
        attributes: [],
        include: [
          {
            model: db.bank,
            attributes: ["id", "bank_name", "account_name", "account_number"]
          }
        ]
      })
      .then(result => {
        res.send(result);
      });
  });

  app.post("/bank", (req, res) => {
    let reqBody = {
      bank_name: req.body.bank_name,
      account_name: req.body.account_name,
      account_number: req.body.account_number,
      store_id: req.body.store_id
    };
    db.bank
      .create(reqBody)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json({
          message: err.message
        });
      });
  });
};
