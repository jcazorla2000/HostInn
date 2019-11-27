const { model, Schema } = require("mongoose")


const placeSchema = new Schema(
  {
    name: {
      type: String
    },
    hostID: {
      type: Schema.Types.ObjectId,
      ref: "Host"
    },
    price: {
      type: Number,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    photo: {
      type: String
    },
    imgName: {
      type: String
    },
    imgPath: {
      type: String
    },
    lng : {
      type: String,
      required: true
    },
    lat : {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model("Place", placeSchema)