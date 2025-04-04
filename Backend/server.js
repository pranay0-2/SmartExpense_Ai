const { GoogleGenerativeAI } = require("@google/generative-ai");

// Set up Gemini AI with API Key
const genAI = new GoogleGenerativeAI("AIzaSyDnBSxfDexdvh-BxNwx2rvc2Cm7nUsNXDM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use latest version

async function getAIAdvice(expenses) {
    try {
        const prompt = `{
  "prompt": "Analyze the user's expenses and provide money-saving tips in JSON format. Keep it under 200 words.\n\n### User Expenses Data:\n{expenses_data}\n\n### Format your response strictly as JSON:\n{\n  \"advice\": [\n    { \"category\": \"Category Name\", \"observation\": \"Observation about spending\", \"suggestion\": \"Money-saving tip\" },\n    { \"category\": \"Category Name\", \"observation\": \"Observation about spending\", \"suggestion\": \"Money-saving tip\" }\n  ],\n  \"total_savings\"}\n"
}
 :
        ${JSON.stringify(expenses, null, 2)}`;

        // Correct function call with an object
        const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });

        // Extract text response
        const aiAdvice = result.response.candidates[0]?.content?.parts[0]?.text || "No response from AI";

        console.log("AI Advice:", aiAdvice);
        return aiAdvice;
    } catch (error) {
        console.error("Error:", error);
        return "Something went wrong.";
    }
}
0
// Example Expenses Data
const expenses = {
    coffee: [200, 200, 200, 200],
    shopping: [100, 0, 200, 300],
    entertainment: [200, 200, 200, 200]
};

// Run the function
getAIAdvice(expenses);
