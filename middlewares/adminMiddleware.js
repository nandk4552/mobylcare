const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    //get user
    const user = await userModel.findById(req.body.id);

    //check user is admin or not
    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "only admin can access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized access",
      error,
    });
  }
};
