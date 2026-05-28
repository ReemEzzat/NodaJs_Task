const errorHandler = (err, req, res, next) => {
    console.error("❌❌ Error middleware:", err);

    console.log(err.name)
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message,
        })
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID",
        })
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            message: `${field} : ${err.keyValue[field]} already exists!`
        })
    }

    if (err.name === "APIError") {
        return res.status(err.status).json({
            message: err.message,
        })
    }

    res.status(500).json({
        message: "Something went wrong"
    })
}

module.exports = errorHandler;
