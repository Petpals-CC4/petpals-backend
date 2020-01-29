const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport');
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.json')[env];
const PORT = config.app_port

const app = express();

const bankService = require('./services/bank')
const feedbackService = require('./services/feedback')
const guideTextService = require('./services/guide_text')
const orderService = require('./services/order')
const serviceService = require('./services/service')
const storeService = require('./services/store')
const userService = require('./services/user')
const storeImageService = require('./services/store_image')
const addressService = require('./services/address')
const paymentMethodService = require('./services/payment_method')

const db = require('./models');
const Op = Sequelize.Op

app.use(cors())
app.use(express.static('uploads'));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/passport')

db.sequelize.sync({ force: false, alter: false }).then(() => {

  bankService(app, db)
  feedbackService(app, db)
  guideTextService(app, db)
  orderService(app, db, Op)
  serviceService(app, db, Op)
  storeService(app, db)
  userService(app, db)
  storeImageService(app, db)
  addressService(app, db)
  paymentMethodService(app, db)

  app.use("/healthCheck", (req, res, next) => {
    res.status(200).json({ message: "ok" })
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });
})