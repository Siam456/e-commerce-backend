const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["Show", "Hide"],
    default: "Show",
  },
});

const Label = mongoose.model("Label", labelSchema);

module.exports = Label;
