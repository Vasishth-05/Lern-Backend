import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        typeof: Schema.Types.ObjectId,
        ref: "user"
    },
    channel: {
        typeof: Schema.Types.ObjectId,
        ref: "user"
    }
});

export const Subscription = mongoose.Model("Subscription",subscriptionSchema)