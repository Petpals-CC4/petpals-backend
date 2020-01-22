module.exports = (app, db) => {
  
  app.get("/bank/:store_id", async (req, res) => {
    let result = await db.bank.findAll({
      where: {
        store_id: req.params.store_id
      }
    })
    if (!result) {
      res.status(404).send({message: "Not found Bank by store id"})
    } else {
      res.status(200).send(result)
    }

    // db.store
    //   .findOne({
    //     where: {
    //       id: req.params.store_id
    //     },
    //     attributes: [],
    //     include: [
    //         {
    //         model: db.bank,
    //         attributes:['id', 'bank_name', 'account_name','account_number']
    //         }
    //       ]
    //     })
    //     .then(result => {
    //     res.send(result);
    //   });
  });
}

