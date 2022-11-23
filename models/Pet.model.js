const { Schema, model } = require("mongoose");

const petSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: false,
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
        location: {
            type: {
                type: String,
            },
            coordinates: [Number],
        },
        status: {
            type: String,
            enum: ["IN ADOPTION", "RESERVED", "ADOPTED"],
            default: "IN ADOPTION"
        },
        description: { type: String, default: 'no description.' },

        shelterBy: { type: Schema.Types.ObjectId, ref: "User" },

        image: { type: String, set: v => v === "" ? "https://i.stack.imgur.com/l60Hf.png" : v },

    },
    {
        timestamps: true
    }
);
petSchema.index({ location: '2dsphere' })
const Pet = model("Pet", petSchema);

module.exports = Pet;
