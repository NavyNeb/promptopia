import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt.model";

export const GET = async (req, res, next) => {
    try {
        await connectToDB()

        const promptsList = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(promptsList), { status: 200 })
    } catch (error) {
        console.log('error', error)
        return new Response("An error occurred while fetching prompts from server. Please try again", { status: 500 })
    }
}