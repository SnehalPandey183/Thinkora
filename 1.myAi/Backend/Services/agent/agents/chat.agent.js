
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"
import { getMemory } from "../config/memory.js"

export const chatAgent = async (state) => {

    const llm = getModel("chat")

    // Get conversation history
    const history = await getMemory(state.conversationId)

    // Only keep recent messages
    const recentHistory = history.slice(-10)

    // Prepare small search context
    const hasSearchResults =
        Array.isArray(state.searchResults?.results) &&
        state.searchResults.results.length > 0

    const searchContext = hasSearchResults
        ? state.searchResults.results
            .slice(0, 3)
            .map((result, index) => {
                return `Source ${index + 1}: ${result.title}
${result.content?.slice(0, 1200) || ""}`
            })
            .join("\n\n")
        : ""

    const systemPrompt = `
You are Thinkora, an intelligent AI assistant.

${searchContext ? `
Web Search Results:

${searchContext}

Use these search results to answer the user's question.
` : ""}

Rules:

- For simple questions, greetings, and short queries, respond naturally.
- For technical, educational, coding, or detailed topics, use clean Markdown.
- Do not mention internal tools.
- Keep answers concise.
- Do not generate unnecessary long responses.
`

    const messages = [
        new SystemMessage(systemPrompt)
    ]

    // Add recent conversation history
    recentHistory.forEach(msg => {

        if (msg.role === "user") {
            messages.push(new HumanMessage(msg.content))
        }

        if (msg.role === "assistant") {
            messages.push(new AIMessage(msg.content))
        }

    })

    // Add current user prompt
    const lastMessage = recentHistory[recentHistory.length - 1]

    if (!(lastMessage?.role === "user" &&
          lastMessage?.content === state.prompt)) {

        messages.push(new HumanMessage(state.prompt))
    }

    console.log("Messages sent to LLM:", messages.length)

    const response = await llm.invoke(messages)

    return {
        ...state,
        aiResponse: response.content
    }
}