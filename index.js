const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport');
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.json')[env];
const PORT = config.app_port

const app = express();

const storeService = require('./services/store')
const serviceService = require('./services/service')
const orderService = require('./services/order')
const bankService = require('./services/bank')
const userService = require('./services/user')
const guide_text = require('./services/guide_text')

const db = require('./models');
const Op = Sequelize.Op

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors())

require('./config/passport')

db.sequelize.sync({ force: true, alter: false }).then(() => {

  serviceService(app, db, Op)
  storeService(app, db)
  orderService(app, db, Op)
  bankService(app, db)
  userService(app, db)
  guide_text(app, db)

  app.use("/healthCheck", (req, res, next) => {
    res.status(200).json({ message: "ok"})
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });
})