const userService = require("../services/usersService");

const signUp = async (req, res, next) => {
    try {
        const { name, email, password, age, bio } = req.body;
        const user = await userService.signUp({ name, email, password, age, bio });
        res.status(201).json({
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userService.signIn({ email, password });
        res.status(200).json({
            message: "Signed in successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json({
            message: "User Fetched Successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const data = await userService.getAllUsers(req.query);
        res.status(200).json({
            message: "Users Fetched Successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

const countUsers = async (req, res, next) => {
    try {
        const count = await userService.countUsers();
        res.status(200).json({
            message: "Users Counted Successfully",
            data: { count }
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteUser(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.updateUser(id, req.body);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json({
            message: "User Updated Successfully",
            data: user
        });
    } catch (error) {
        next(error);
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
