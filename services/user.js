const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config/passport");
const bcrypt = require("bcryptjs");
const { findStoreIDbyUserID } = require("../utils");

const getUser = async (db, req, res, mode = "user") => {
  const User = await db.user.findAll({
    attributes: ["id", "email", "firstname", "lastname", "role", "status"],
    include: [
      {
        model: db.store,
        attributes: ['id', 'store_name', 'store_description']
      }
    ]
  });
  if (!User) {
    res.status(404).json({ message: "Not Found" });
  } else {
    let userLean = await User.filter(user => user.role === mode).map(user => {
      return {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        status: user.status,
        store_id: user.store ? user.store.id : null,
        store_name: user.store ? user.store.store_name : null,
        store_description: user.store ? user.store.store_description : null
      };
    });
    res.status(200).json(userLean);
  }
};

module.exports = (app, db) => {
  app.post("/signup", (req, res, next) => {
    passport.authenticate("register", async (err, user, info) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" });
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send({ message: info.message });
      } else {
        if (!user) {
          console.error("Not Found User");
          res.status(404).send({ message: "Error: Not Found User" });
        } else {
          let result = await updateUserRole(user, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            profile_image_url: req.body.profile_image_url,
            role: "user"
          });
          if (result.message !== "user created") {
            res.status(500).send({ message: "Error: Cannot Set Role User" });
          } else {
            res.status(200).send(result);
          }
        }
      }
    })(req, res, next);
  });

  app.post("/signup_store", (req, res, next) => {
    passport.authenticate("register", async (err, user, info) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" });
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send({ message: info.message });
      } else {
        if (!user) {
          console.error("Not Found User");
          res.status(404).send({ message: "Error: Not Found User" });
        } else {
          let result = await updateUserRole(user, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            profile_image_url: req.body.profile_image_url,
            role: "store"
          });
          if (result.message !== "user created") {
            res
              .status(500)
              .send({ message: "Error: Cannot Set Role User", ...result });
          } else {
            res.status(200).send(result);
          }
        }
      }
    })(req, res, next);
  });

  app.post("/signin", (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" });
      }
      if (info !== undefined) {
        // console.error(info.message);
        res.status(403).send({ message: info.message });
      } else {
        // console.log('User Authenticated');
        const store_id = await findStoreIDbyUserID(db, user.id);
        const token = jwt.sign(
          { id: user.id, role: user.role, username: user.email, store_id },
          config.jwtOptions.secretOrKey,
          {
            expiresIn: 3600
          }
        );
        // console.log(token)
        res.status(200).send({
          auth: true,
          message: "User Authenticated",
          token
        });
      }
    })(req, res, next);
  });

  app.put("/change_password", (req, res, next) => {
    if (req.body.old_password === req.body.new_password) {
      res
        .status(400)
        .send({ message: "New password haven't to the same as old password" });
    }
    passport.authenticate("change_password", async (err, user, info) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message: "Bad Request" });
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send({ message: info.message });
      } else {
        let hashedPassword = bcrypt.hashSync(req.body.new_password, user.salt);
        let updatedUser = await db.user.update(
          { password: hashedPassword },
          { where: { id: user.dataValues.id } }
        );
        if (updatedUser) {
          console.log("Your password is updated");
          res.status(200).send({ message: "Your password is updated" });
        } else {
          console.error(err);
          res.status(400).send(err);
        }
      }
    })(req, res, next);
  });

  app.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "user") {
        let result = await db.user.findOne({
          where: {
            id: req.user.id
          }
        });
        if (!result) {
          res.status(404).send({ message: "Not found user" });
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.get(
    "/admin_user",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "admin") {
        getUser(db, req, res, "user");
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.get(
    "/admin_store",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      if (req.user.role === "admin") {
        getUser(db, req, res, "store");
      } else {
        res.status(401).send({ message: "Unauthorized" });
      }
    }
  );

  app.put("/admin/update_status",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      try {
        if (req.user.role === "admin") {
          const foundUser = await db.user.findOne({
            where: {
              id: req.body.user_id
            }
          })
          if (!foundUser) {
            res.status(404).send({ message: "Error: User Not Found" });
          } else {
            let userStatus = await foundUser.status
            const updatedUserStatus = await foundUser.update({
              status: userStatus === "active" ? "banned" : "active"
            })
            res.status(200).send({ message: "User Status Updated" });
          }
        } else {
          res.status(401).send({ message: "Unauthorized" });
        }
      } catch (error) {
        res.status(500).send(error)
      }
    }
  )

};

updateUserRole = async (user, user_data = {}) => {
  let result = { message: "user created" };
  await user
    .update({
      ...user_data
    })
    .then(() => {
      console.log("user created in db");
    })
    .catch(err => {
      console.log(err);
      result = { message: err };
    });
  return result;
};
