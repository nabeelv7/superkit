import mongoose from "mongoose";

export const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    link: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
})

export default mongoose.models.Link || mongoose.model("Link", linkSchema)