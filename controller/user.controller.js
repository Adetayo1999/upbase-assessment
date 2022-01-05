const User = require("../models/user.model");
const sharp = require("sharp");
const { compare, hash } = require("bcrypt");

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) throw new Error("User does not exist in our database");

    res.send(user);
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
  }
};

exports.updateUserImage = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 200, height: 200 })
    .png()
    .toBuffer();

  await User.findByIdAndUpdate(req.id, { userImage: buffer });

  res.send();
};

exports.getUserImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.userImage) throw new Error();

    res.set("Content-type", "image/png");
    res.send(user.userImage);
  } catch (err) {
    res.status(400).send();
  }
};

exports.deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.id);
    if (!user) throw new Error("User does not exist");

    res.send({
      message: "User Account Deleted",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) throw new Error();
    const isPassword = await compare(req.body.oldPassword, user.password);
    if (!isPassword) throw new Error();
    const hashedPassword = await hash(req.body.newPassword, 8);
    user.password = hashedPassword;
    await user.save();
    res.send({
      message: "Password successfully changed",
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { about, firstName, lastName } = req.body;

  try {
    const user = await User.findById(req.id);

    if (about && about !== user.about) {
      user.about = about;
    }

    if (firstName && firstName !== user.firstName) {
      user.firstName = firstName;
    }

    if (lastName && lastName !== user.lastName) {
      user.lastName = lastName;
    }

    await user.save();

    res.send({
      message: "User Profile Updated",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
