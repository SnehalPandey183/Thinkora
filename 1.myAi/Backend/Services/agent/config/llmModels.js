import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

dotenv.config();

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
})


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash"
})

export const getModel= (agent)=>{
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;
        case "coding":
            return gemini;

        default:
            return groq;
    }
}