import { connectDB } from "@/lib/db";
import Description from "@/models/hero/description";

export async function GET() {
    try {
        await connectDB();

        const description = await Description
            .findOne()
            .sort({ createdAt: -1 });

        if (!description) {
            return new Response(
                JSON.stringify({ message: "No description found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(description), {
            status: 200,
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        );
    }
}
