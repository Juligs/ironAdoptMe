const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: false,
            unique: true
        },
        descripcion: {
            type: String,
            required: true
        },
        date: {
            type: String
        },
        address: {
            type: String
        },
        eventImage: {
            type: String,
            set: v => v === "" ? "https://i.stack.imgur.com/l60Hf.png" : v
        }
    },
    {
        timestamps: true
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;