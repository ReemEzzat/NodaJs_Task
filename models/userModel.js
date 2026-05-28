const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    age: Number,
    bio: { type: String }
},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);

module.exports = User;
