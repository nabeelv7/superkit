import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
    }
})

export default mongoose.models.User || mongoose.model("User", userSchema)