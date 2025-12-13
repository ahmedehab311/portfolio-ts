import mongoose, { Document, Schema } from "mongoose";

export interface TDescription extends Document {
    title: string;
    description: string;
}

const DescriptionSchema = new Schema<TDescription>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // optional بس احترافي
    }
);

export default mongoose.models.Description ||  mongoose.model<TDescription>("Description", DescriptionSchema);
