const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: false,
            unique: true
        },
        comment: {
            type: String,
            required: true
        },
        commentImage: {
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