const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport');
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.json')[env];
const PORT = config.app_port

const app = express();

// const userService = require('./services/user');
// const walletService = require('./services/wallet')
// const transactionService = require('./services/transaction')
const storeService = require('./services/store')
const serviceService = require('./services/service')
const orderService = require('./services/order')

const db = require('./models');
const Op = Sequelize.Op

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors())

require('./config/passport')

db.sequelize.sync({ force: false, alter: false }).then(() => {


  serviceService(app, db, Op)
  storeService(app, db)
  orderService(app, db, Op)


  app.get("/", (req, res, next) => {
    res.stauts(200).json({ message: "ok"})
  })

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });
})