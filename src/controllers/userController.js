let userModel = require("../models/userModel");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let { validUser } = require("../helper/validateSchema");

const createUser = async function (req, res) {
  try {
    let user = req.body;
    let { mobile, userName } = req.body;

    const result = await validUser.validateAsync(user);
    console.log(result);

    // Joi.validate(user, validUser, (err, value) => {
    //   if (err) {
    //     return res.status(422).json({
    //       status: "error",
    //       message: err,
    //     });
    //   }
    // });

    const checkDuplicate = await userModel.findOne({
      mobile: mobile,
      userName: userName,
    });
    if (checkDuplicate) {
      return res.status(400).send({
        status: false,
        message: "This mobile or userName are not unique",
      });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const createdUser = await userModel.create(user);
    return res
      .status(201)
      .send({ status: true, message: "user created", data: createdUser });
  } catch (err) {
    // console.log(err)
    if (err.isJoi === true) {
      err.status = 422;
      return res
        .status(err.status)
        .send({ status: false, message: err.message });
    }
    return res.status(500).send({ status: false, message: err.message });
  }
};

const userLogin = async function (req, res) {
  try {
    let { userName, password } = req.body;

    let user = await userModel.findOne({
      userName: userName,
    });
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "user not found with given credentials ",
      });
    }
    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid password" });
    }

    console.log(user);
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        iat: new Date().getTime(),
        expiresIn: "10h",
      },
      "node_key"
    );
    return res
      .status(200)
      .send({ status: true, message: "Logged in SuccessFully", data: token });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createUser, userLogin };
