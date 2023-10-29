const UserModel = require("../models/UserModel");

const usersList = async (req, res, next) => {
  let projection = {};
  if (req.query.hasOwnProperty("fields")) {
    projection = req.query.fields.split(",").reduce((total, current) => {
      return { [current]: 1, ...total };
    }, {});
  }
  /* ========= Pagination ======== */
  const perPage = 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * perPage;

  const usersCount = await UserModel.count();
  const totalPages = Math.ceil(usersCount / perPage);
  const users = await UserModel.find({}, projection)
    .limit(perPage)
    .skip(offset);
  res.send({
    success: true,
    message: "Users list generated successfuly",
    data: { users },
    meta: {
      page,
      pages: totalPages,
      next: hasNextPage(page, totalPages)
        ? `${process.env.APP_URL}/api/v1/users?page=${parseInt(page) + 1}`
        : null,
      prev: hasPrevPage(page)
        ? `${process.env.APP_URL}/api/v1/users?page=${page - 1}`
        : null,
    },
  });
};

const addUser = async (req, res, next) => {
  try {
    const {
      username,
      password,
      avatar,
      mobile,
      cup,
      coin,
      gem,
      banLeague,
      canWithdraw,
      isOnline,
      soccer_level,
      soccer_win,
      billiard_level,
      billiard_win,
      role,
    } = req.body;
    const newUser = new UserModel({
      username,
      password,
      avatar,
      mobile,
      cup,
      coin,
      gem,
      banLeague,
      canWithdraw,
      isOnline,
      soccer_level,
      soccer_win,
      billiard_level,
      billiard_win,
      role,
    });
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "New user created successfuly",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: "There is no user with this id" });
    }
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({ error: true, message: "User not found" });
    }

    return res.send({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no user with this id",
      });
    }

    await UserModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "User deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no user with this id",
      });
    }

    const { n, nModified } = await UserModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new Error("Update failed");
    }
    res.send({
      success: true,
      message: "User updated successfuly",
    });
  } catch (error) {
    next(error);
  }
};

const hasNextPage = (page, totalPage) => {
  return page < totalPage;
};

const hasPrevPage = (page) => {
  return page > 1;
};

module.exports = { usersList, addUser, getUser, deleteUser, updateUser };
