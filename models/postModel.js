const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5 },
    content: { type: String, required: true, minlength: 10 },
    category: { type: String, enum: ["Tech", "Life", "Health", "Education"], default: "Life" },
    author: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
