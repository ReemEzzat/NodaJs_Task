const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async ({ name, email, password, age, bio }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            bio
        });
        // Return user without password
        const userObj = user.toObject();
        delete userObj.password;
        return userObj;
    } catch (error) {
        throw error;
    }
};

const signIn = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw { name: "APIError", status: 401, message: "Invalid email or password" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw { name: "APIError", status: 401, message: "Invalid email or password" };
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } };
    } catch (error) {
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findById(id).select("-password");
        return user;
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async (query) => {
    try {
        const { page = 1, limit = 10, search } = query;
        const skip = (page - 1) * limit;

        const filter = search
            ? { name: { $regex: search, $options: "i" } }
            : {};

        const users = await User.find(filter).select("-password").skip(skip).limit(limit);
        const totalCount = await User.countDocuments(filter);

        const pagination = {
            page: Number(page),
            limit: Number(limit),
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        };
        return { users, pagination };
    } catch (error) {
        throw error;
    }
};

const countUsers = async () => {
    try {
        const count = await User.countDocuments();
        return count;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findOneAndDelete({ _id: id });
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, data) => {
    try {
        const update = {
            name: data.name,
            age: data.age,
            bio: data.bio
        };
        const user = await User.findByIdAndUpdate(id, update, { new: true }).select("-password");
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    signUp,
    signIn,
    getUserById,
    getAllUsers,
    countUsers,
    deleteUser,
    updateUser
};
