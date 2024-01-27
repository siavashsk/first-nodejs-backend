const getItemsList = async (req, res, next, title, model) => {
  try {
    const item = await model.find({});
    res.send({
      success: true,
      message: `{${title}'s list generated successfuly}`,
      data: { item },
    });
  } catch (error) {
    next(error);
  }
};

const getItem = async (req, res, next, title, model) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: `{There is no ${title} with this id}` });
    }

    const item = await model.findOne({ _id: id });
    if (!item) {
      return res
        .status(404)
        .send({ error: true, message: `{${title} not found}` });
    }
    return res.send({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next, title, model) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: `{There is no ${title} with this id}`,
      });
    }

    await model.deleteOne({ _id: id });
    res.send({
      success: true,
      message: `{${title} deleted successfuly}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getItemsList, getItem, deleteItem };
