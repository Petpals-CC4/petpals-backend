const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/passport');
const bcrypt = require('bcryptjs')
const { findStoreIDbyUserID } = require("../utils");

module.exports = (app, db) => {
  app.post('/signup', (req, res, next) => {
    passport.authenticate('register', async (err, user, info) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" })
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send({ message: info.message });
      } else {
        if (!user) {
          console.error("Not Found User")
          res.status(404).send({ message: "Error: Not Found User" })
        } else {
          let result = await updateUserRole(user, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            profile_image_url: req.body.profile_image_url,
            role: "user"
          })
          if (result.message !== 'user created') {
            res.status(500).send({ message: "Error: Cannot Set Role User" })
          } else {
            res.status(200).send(result);
          }
        }
      }
    })(req, res, next);
  });

  app.post('/signup_store', (req, res, next) => {
    passport.authenticate('register', async (err, user, info) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" })
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send({ message: info.message });
      } else {
        if (!user) {
          console.error("Not Found User")
          res.status(404).send({ message: "Error: Not Found User" })
        } else {
          let result = await updateUserRole(user, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            profile_image_url: req.body.profile_image_url,
            role: "store"
          })
          if (result.message !== 'user created') {
            res.status(500).send({ message: "Error: Cannot Set Role User", ...result })
          } else {
            res.status(200).send(result);
          }
        }
      }
    })(req, res, next);
  });

  app.post('/signin', (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" })
      }
      if (info !== undefined) {
        // console.error(info.message);
        res.status(403).send({ message: info.message });
      } else {
        // console.log('User Authenticated');
        const store_id = await findStoreIDbyUserID(db, user.id);
        const token = jwt.sign({ id: user.id, role: user.role, username: user.email, store_id }, config.jwtOptions.secretOrKey, {
          expiresIn: 3600,
        });
        // console.log(token)
        res.status(200).send({
          auth: true,
          message: "User Authenticated",
          token,
        });
      }
    })(req, res, next);
  });

  app.put('/change_password', (req, res, next) => {
    if (req.body.old_password === req.body.new_password) {
      res.status(400).send({ message: "New password haven't to the same as old password" })
    }
    passport.authenticate('change_password', async (err, user, info) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" })
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send({ message: info.message });
      } else {
        let hashedPassword = bcrypt.hashSync(req.body.new_password, user.salt);
        let updatedUser = await db.user.update({ password: hashedPassword }, { where: { id: user.dataValues.id } })
        if (updatedUser) {
          console.log("Your password is updated");
          res.status(200).send({ message: "Your password is updated" })
        } else {
          console.error(err)
          res.status(400).send(err)
        }
      }
    })(req, res, next);
  });

}

updateUserRole = async (user, user_data = {}) => {
  let result = { message: 'user created' }
  await user.update({
    ...user_data,
  }).then(() => {
    console.log('user created in db');
  }).catch(err => {
    console.log(err)
    result = { message: err }
  })
  return result
}