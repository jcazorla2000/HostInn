const {model, Schema} = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    telephoneNumber: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["Huesped", "Anfitrion"],
      default: "Huesped"
    },
    rating: {
      type: Number,
      default: 5
    },
    photo: {
      type: String,
      default: "https://www.voanews.com/themes/custom/voa/images/Author__Placeholder.png"
    },
    places: [
      {
        type: Schema.Types.ObjectId,
        ref: "Place"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model("User", userSchema)