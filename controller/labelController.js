const Label = require("../models/Label");

const addLabel = async (req, res) => {
  try {
    const newLabel = new Label(req.body);
    await newLabel.save();
    res.status(200).send({
      message: "Label Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllLabel = async (req, res) => {
  try {
    await Label.insertMany(req.body);
    res.status(200).send({
      message: "Labels Added successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingLabel = async (req, res) => {
  try {
    const categories = await Label.find({ status: "Show" }).sort({
      _id: -1,
    });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllLabel = async (req, res) => {
  try {
    const labels = await Label.find({}).sort({ _id: -1 });
    res.send(labels);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getLabelById = async (req, res) => {
  try {
    const label = await Label.findById(req.params.id);
    res.send(label);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateLabel = async (req, res) => {
  try {
    const label = await Label.findById(req.params.id);
    if (label) {
      label.name = req.body.name;
      // Label.slug = req.body.slug;
      label.icon = req.body.icon;
      label.status = req.body.status;
      await label.save();
      res.send({ message: "Label Updated Successfully!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Label not found!" });
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;

  Label.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Label ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteLabel = (req, res) => {
  Label.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Label Deleted Successfully!",
      });
    }
  });
};

module.exports = {
  addLabel,
  addAllLabel,
  getShowingLabel,
  getAllLabel,
  getLabelById,
  updateLabel,
  updateStatus,
  deleteLabel,
};
