import mongoose from "mongoose";

export const visitSchema = mongoose.Schema({
    location: {
        country: { type: String, trim: true },
        city: { type: String, trim: true },
        flag: { type: String, trim: true },
        isEU: { type: Boolean, default: false },
    },
    referrer: {
        type: String,
        trim: true,
    },
    browser: {
        type: String,
        trim: true,
    },
    device: {
        type: String,
        trim: true,
    },
    OS: {
        type: String,
        trim: true,
    },
    pages: {
        type: [String],
        default: [],
    },
    entryPage: {
        type: String,
    },
    exitLink: {
        type: String,
    }
})

export default mongoose.models.Visit || mongoose.model("Visit", visitSchema)