import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    page: {
        type: String,
        lowercase: true,
        required: true,
        maxlength: 20,
    },
    links: {
        type: [Link]
    }
})

export default mongoose.models.User || mongoose.model("User", userSchema)