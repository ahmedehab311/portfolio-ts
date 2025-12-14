import mongoose, { Document, Schema, models, model } from "mongoose";

export interface TSkillsHero extends Document {
    name: string;
    icon: string;
    color?: string;
    order: number
}

const SkillsHeroSchema = new Schema<TSkillsHero>(
    {
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        order: { type: Number, default: 1 },
    },
    {
        timestamps: true,
    }
);
export const SkillsHero = models["Skills-hero"] || model("Skills-hero", SkillsHeroSchema);