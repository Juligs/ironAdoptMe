const { Schema, model } = require("mongoose");

const petSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: false,
            unique: true
        },
        age: {
            type: Number
        },
        breed: {
            type: String
        },
        size: {
            type: String
        },
        status: {
            type: String,
            enum: ["EN ADOPCIÓN", "RESERVADO", "ADOPTADO"],
            default: "EN ADOPCIÓN"
        },
        description: { type: String, default: 'no description.' },

        profileImg: { type: String, set: v => v === "" ? "https://i.stack.imgur.com/l60Hf.png" : v },
    },
    {
        timestamps: true
    }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;
