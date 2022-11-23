const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId, ref: "User"
        },
        title: {
            type: String,
            trim: true,
            required: false,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            get: value => value.toDateString(),
        },
        address: {
            type: String
        },
        image: {
            type: String,
            set: v => v || "https://i.stack.imgur.com/l60Hf.png"
        },
        participants: {
            type: Schema.Types.ObjectId, ref: "User"
        },
        location: {
            type: {
                type: String,
            },
            coordinates: [Number],
        }
    },
    {
        timestamps: true
    }
);
eventSchema.index({ location: '2dsphere' })
const Event = model("Event", eventSchema);

module.exports = Event;