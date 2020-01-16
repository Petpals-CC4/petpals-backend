module.exports = (app, db) => {
  app.get("/shopdetail/:id", async (req, res) => {

    const Store = await db.store.findAll({
         where: {id: req.params.id},
         attributes:['id','store_name','store_description'],
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

       const newStore = await Store.map(store => {
         return  {
             id: store.id,
             store_name: store.store_name,
             store_description: store.store_description,
             store_images: store.store_images.map(item => item.image_url),
             address: store.addresses,
             feedback: store.feedbacks,
             service: store.services
         }
     })
     res.status(201).json(newStore)
   })

}