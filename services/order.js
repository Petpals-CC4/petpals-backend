module.exports = (app, db, Op) => {

    app.post('/shopdetail/:id/payment', async (req, res) => {

        try {

            const orderRequest = {
                user_id : req.body.user_id,
                store_id : req.params.id,
                service_id: req.body.service_id,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                payment_name: req.body.payment_name,
                booking_price: req.body.booking_price,
                total_price: req.body.total_price
            }
    
            //flow to create order-service
    
            //1. crate OrderStatus
            const createOrderStatus = await db.order_status.create({
                status_name: 'willing_payment'
            }) 
            const orderStatusId = await createOrderStatus.id
            
            //2. create PaymentMethod
            const createPaymentMethod = await db.payment_method.create({
                payment_name: orderRequest.payment_name
            }) 
            const paymentMethodId = await createPaymentMethod.id
    
            //3. use orderId and paymentId to create order
            const createOrder = await db.order.create({
                user_id: orderRequest.user_id,
                store_id: orderRequest.store_id,
                payment_method_id: Number(paymentMethodId),
                status_id: orderStatusId,
                start_date: orderRequest.start_date,
                end_date: orderRequest.end_date,
                slip_image: null,
                booking_price: orderRequest.booking_price,
                total_price: orderRequest.total_price
            })
            const orderId = await createOrder.id
            console.log(orderId)
            console.log(orderRequest.service_id)
    
            // 4. find service-price and use orderId to creat orderService 
    
            const findServicePrice = await db.service.findOne({
                where: {id: orderRequest.service_id},
                attributes: ['service_price'],
            })
            const servicePrice = await findServicePrice.service_price
            console.log(servicePrice)

            // !!!bug cant create order service
            const createOrderService = await db.order_service.create({
                service_price: 4000,
                service_id: `${orderRequest.service_id}`,
                order_id: `${orderId}`
            })
    
            res.json('success')
        } catch (err) {
            res.json(err.message)
        }

       
    })
    
}