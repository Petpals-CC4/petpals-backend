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
            attributes:['id', 'bank_name', 'account_name','account_number']
            }
          ]
        })
        .then(result => {
        res.send(result);
      });
  });
}

