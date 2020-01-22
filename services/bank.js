module.exports = (app, db) => {
  app.get("/bank/:store_id", async (req, res) => {
    let result = await db.bank.findAll({
      where: {
        store_id: req.params.store_id
      }
    });
    if (!result) {
      res.status(404).send({ message: "Not found Bank by store id" });
    } else {
      res.status(200).send(result);
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

  app.put("/bank/:id", async (req, res) => {
    const id = req.params.id;
    const store_id = req.body.store_id;
    console.log(
      "store_idstore_idstore_idstore_idstore_idstore_idstore_idstore_id",
      store_id
    );
    const bankFound = await db.bank.findOne({
      where: { store_id, id }
    });
    if (!bankFound) {
      res.status(404).send({ message: "Error: Not Found" });
    } else {
      try {
        const bank = await bankFound.update({
          bank_name: req.body.bank_name,
          account_name: req.body.account_name,
          account_number: req.body.account_number,
          store_id: req.body.store_id
        });
        console.log(bank);
        res.status(200).send({ message: "Update Success", ...bank.dataValues });
      } catch (error) {
        // res.status(400).send({ message: "bank name cannot be empty." })
        res.status(400).send({ message: error.errors[0].message });
      }
    }
  });

  app.delete("/bank/:id", async (req, res) => {
    const id = req.params.id;
    const store_id = req.body.store_id;

    const bankFound = await db.bank.findOne({
      where: { store_id, id }
    });
    if (!bankFound) {
      res.status(404).send({ message: "Error: Not Found" });
    } else {
      const wallet = await bankFound.destroy();
      console.log(wallet);
      res.status(200).send({ message: "Delete Success" });
    }
  });
};
