const Post = require("../models/postModel");
const APIError = require("../utils/APIError");

const createPost = async ({ title, content, category, userId }) => {
    try {
        const post = await Post.create({ title, content, category, userId });
        return post;
    } catch (error) {
        throw error;
    }
};

const getAllPosts = async (query, userId) => {
    try {
        const { page = 1, limit = 10, search } = query;
        const skip = (page - 1) * limit;

        const filter = search
            ? { title: { $regex: search, $options: "i" } }
            : {};

        const posts = await Post.find(filter)
            .populate("userId", "name email")
            .skip(skip)
            .limit(limit);

        const totalCount = await Post.countDocuments(filter);

        const pagination = {
            page: Number(page),
            limit: Number(limit),
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        };

        const postsWithOwner = posts.map(post => {
            const postObj = post.toObject();
            postObj.isOwner = postObj.userId && postObj.userId._id
                ? postObj.userId._id.toString() === userId.toString()
                : false;
            return postObj;
        });

        return { posts: postsWithOwner, pagination };
    } catch (error) {
        throw error;
    }
};

const getPostById = async (id, userId) => {
    try {
        const post = await Post.findById(id).populate("userId", "name email");
        if (!post) return null;

        const postObj = post.toObject();
        postObj.isOwner = postObj.userId && postObj.userId._id
            ? postObj.userId._id.toString() === userId.toString()
            : false;
        return postObj;
    } catch (error) {
        throw error;
    }
};

const updatePostById = async (id, data, userId) => {
    try {
        const post = await Post.findById(id);
        if (!post) return null;

        if (post.userId.toString() !== userId.toString()) {
            throw new APIError("You are not authorized to update this post", 403);
        }

        const update = {
            title: data.title,
            content: data.content,
            category: data.category,
        };
        const updatedPost = await Post.findByIdAndUpdate(id, update, { new: true });
        return updatedPost;
    } catch (error) {
        throw error;
    }
};

const deletePostById = async (id, userId) => {
    try {
        const post = await Post.findById(id);
        if (!post) return null;

        if (post.userId.toString() !== userId.toString()) {
            throw new APIError("You are not authorized to delete this post", 403);
        }

        await Post.findByIdAndDelete(id);
        return post;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById
};
