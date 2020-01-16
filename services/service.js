module.exports = (app, db, Op) => {


    app.get('/landingpage', async (req, res) => {

        try{
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
    
            const newTopListStore = await topListStore.map(list => {
                return  {
                    id: list.id,
                    store_name: list.store_name,
                    store_description: list.store_description,
                    store_images: list.store_images.map(item => item.image_url),
                    services: list.services.map(item => item.service_name)
                }
            })
            
            res.status(201).json(newTopListStore)
        } catch (err) {
            res.status(501).json('get store error'. err.message)
        }

        
    })


    app.post('/landingpage/search', async (req, res) => {

        try {
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
        } catch (err) {
            res.status(501).json('find store error'. err.message)
        }

        
    })
}