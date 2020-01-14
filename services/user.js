const passport = require('passport');

module.exports = (app, db) => {
  app.post('/registerUser', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.error(err);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message);
        } else {
            db.user.findOne({
                where: {
                  email: user.email,
                },
            }).then(user => {
              let result = updateUserRole(user, "user")
              res.status(200).send(result);
            }).catch(err => {
                console.log(err)
            })
        }
    })(req, res, next);
  });

  app.post('/registerStore', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.error(err);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message);
        } else {
            db.user.findOne({
                where: {
                  email: user.email,
                },
            }).then(user => {
              let result = updateUserRole(user, "store")
              res.status(200).send(result);
            }).catch(err => {
                console.log(err)
            })
        }
    })(req, res, next);
  });


}

updateUserRole = (user, role = "user") => {
  user.update({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    profile_image_url: req.body.profile_image_url,
    role: role
  }).then(() => {
      console.log('user created in db');
      return { message: 'user created' }
  }).catch(err => {
    console.log(err)
    return { message: err }
  })
}