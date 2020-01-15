module.exports = (app, db, Op) => {


    app.get('/landingpage', async (req, res) => {

        const topListStore = await db.store.findAll({
            attributes: ['id', 'store_name', 'store_description'],
            include: [
                {
                    model: db.store_image,
                    attributes: ['image_url']
                },
                {
                    model: db.service,
                    attributes: ['service_name']
                }
            ]
        })
        
        res.status(201).json(topListStore)
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
                    model: db.address,
                    attributes: ['house_no', 'road', 'sub_district', 'district', 'province', 'post_code']
                },
                {
                    model: db.service,
                    attributes: ['service_name', 'service_description', 'service_price'],
                    where: {
                        service_name : {
                            [Op.substring]: searchInputField.key_service
                        }
                    }
                }
            ]
        })

        res.status(201).json(storeList)
    })
}