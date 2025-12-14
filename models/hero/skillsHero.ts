import mongoose, { Document, Schema } from "mongoose";

export interface TSkillsHero extends Document {
    name: string;
    icon: string;
    color?: string;
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
    },
    {
        timestamps: true, 
    }
);

export const SkillsHero = mongoose.models.SkillsHero || mongoose.model<TSkillsHero>("Skills-hero", SkillsHeroSchema);
