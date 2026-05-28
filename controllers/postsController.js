const postService = require("../services/postsService");
const APIError = require("../utils/APIError");

const createPost = async (req, res, next) => {
    try {
        const { title, content, category } = req.body;
        const userId = req.user.userId;

        const post = await postService.createPost({ title, content, category, userId });

        res.status(201).json({
            message: "Post Created Successfully",
            data: post
        });
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const data = await postService.getAllPosts(req.query, userId);
        res.status(200).json({
            message: "Posts Fetched Successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const post = await postService.getPostById(id, userId);

        if (!post) {
            return next(new APIError("Post Not Found", 404));
        }

        res.status(200).json({
            message: "Post Fetched Successfully",
            data: post
        });
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const post = await postService.updatePostById(id, req.body, userId);

        if (!post) {
            return next(new APIError("Post Not Found", 404));
        }

        res.status(200).json({
            message: "Post Updated Successfully",
            data: post
        });
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const post = await postService.deletePostById(id, userId);

        if (!post) {
            return next(new APIError("Post Not Found", 404));
        }

        res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
