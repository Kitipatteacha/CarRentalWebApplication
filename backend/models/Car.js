const mongoose = require("mongoose");
const { Schema } = mongoose;

const carSchema = new Schema({
  brand: { type: String, required: true },
  type: { type: String, required: true },
  regYear: { type: String, required: true },
  LNumber: { type: String, required: true },
  gear: "manual" | "auto",
  seat: { type: Number, required: true },
  equipment: { type: String },
  
  photo: String,
  availFrom:  { type: Date, required: true },
  availTo: { type: Date, required: true },
  description: { type: String },
  
  pricePerDay: {type: Number, required: true},
  deposit: {type: Number, required: true},

  isRented: { type: Boolean, default: false},
  _owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model("cars", carSchema);
