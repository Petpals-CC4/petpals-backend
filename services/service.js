module.exports = (app, db, Op) => {
  app.get('/landingpage', async (req, res) => {
    const topListStore = await db.store.findAll({
      attributes: ['id', 'store_name', 'store_description'],
      include: [
        {
          model: db.user,
          attributes: ['profile_image_url']
        },
        {
          model: db.feedback,
          attributes: ['rating']
        },
        {
          model: db.address,
          attributes: ['id', 'house_no', 'road', 'sub_district', 'district', 'province', 'post_code']
        },
        {
          model: db.store_image,
          attributes: ['image_url']
        },
        {
          model: db.service,
          attributes: ['id', 'service_name', 'service_description', 'service_price']
        }
      ]
    })
    if (topListStore) {
      const newTopListStore = await topListStore.map(list => {
        let feedbackSummary = list.feedbacks.reduce((sum, curr) => sum += curr.rating, 0)
        return {
          id: list.id,
          store_name: list.store_name,
          store_description: list.store_description,
          store_images: list.store_images.map(item => item.image_url),
          services: list.services,
          profile_image_url: list.user.profile_image_url,
          feedback_score: feedbackSummary / list.feedbacks.length
        }
      })
      res.status(200).json(newTopListStore)
    } else {
      res.status(404).json({ message: "Store Not Found" })
    }
  })

  app.post('/landingpage/search', async (req, res) => {
    const searchInputField = {
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      key_service: req.body.key_service,
      location: req.body.location
    }
    const storeList = await db.store.findAll({
      attributes: ['id', 'store_name', 'store_description'],
      include: [
        {
          model: db.user,
          attributes: ['profile_image_url']
        },
        {
          model: db.feedback,
          attributes: ['rating', 'comment'],
          include: [
            {
              model: db.user,
              attributes: ['firstname', 'lastname']
            }
          ]
        },
        {
          model: db.address,
          attributes: ['id', 'house_no', 'road', 'sub_district', 'district', 'province', 'post_code']
        },
        {
          model: db.store_image,
          attributes: ['image_url']
        },
        {
          model: db.service,
          attributes: ['id', 'service_name', 'service_description', 'service_price'],
          where: {
            service_name: {
              [Op.substring]: searchInputField.key_service
            }
          }
        }
      ]
    })
    const newStoreList = await storeList.map(list => {
      // return list
      let feedbackSummary = list.feedbacks.reduce((sum, curr) => sum += curr.rating, 0)
      return {
        id: list.id,
        store_name: list.store_name,
        store_description: list.store_description,
        store_images: list.store_images.map(item => item.image_url),
        services: list.services,
        profile_image_url: list.user.profile_image_url,
        feedback_score: feedbackSummary / list.feedbacks.length,
        feedbacks: list.feedbacks.map(feedback => ({
          rating: feedback.rating,
          comment: feedback.comment,
          firstname: feedback.user.firstname,
          lastname: feedback.user.lastname,
        }))
      }
    })

    res.status(200).json(newStoreList)
  })
}