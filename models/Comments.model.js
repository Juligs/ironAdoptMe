const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId, ref: "User"
        },
        text: {
            type: String,
            required: true
        },
        image: {
            type: String,
            set: v => v === "" ? "https://i.stack.imgur.com/l60Hf.png" : v
        },
    },
    {
        timestamps: true
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;