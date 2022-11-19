const { Schema, model, default: mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    role: {
      type: String,
      enum: ['USER', 'SHELTER', 'ADMIN'],
      default: 'USER'
    },

    profileImg: { type: String, set: v => v === "" ? "https://i.stack.imgur.com/l60Hf.png" : v },

    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
