module.exports = (app, db) => {
  app.get("/shopdetail/:id", (req, res) => {
    db.store
      .findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
          model: db.feedback,
          attributes:['rating','comment','createdAt'],
          include: [
            {
              model: db.user,
              attributes:['firstname','lastname']
            }]
        },
        {
          model: db.service,
          attributes:['id','service_name','service_description','service_price']
        },
        {
          model: db.address,
          attributes:['house_no','village_no','road','sub_district','district','province','post_code']
        },
        {
          model: db.store_image,
          attributes:['image_url']
        }
      ]
      })
      .then(result => {
        res.send(result);
      });
  });
}