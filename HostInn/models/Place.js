const { model, Schema } = require("mongoose")

const placeSchema = new Schema(
  {
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      enum: ["Nueva York", "Sao Paulo", "Paris", "Barcelona", "Roma", "Ciudad de Mexico"],
      required: true
    },
    hostID: {
      type: Schema.Types.ObjectId,
      ref: "Host"
    },
    date: {
      type: String,
      required: true
    },
    photo: {
      type: String
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)