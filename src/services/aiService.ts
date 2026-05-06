import { GoogleGenAI } from "@google/genai";
import { UserProfile, FitnessPlan, PromptStrategy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateFitnessPlan(profile: UserProfile, strategy: PromptStrategy): Promise<FitnessPlan> {
  const userContext = `
    User Profile:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Weight: ${profile.weight}kg
    - Height: ${profile.height}cm
    - Goal: ${profile.goal}
    - Activity Level: ${profile.activityLevel}
    - Dietary Preference: ${profile.dietaryPreference}
    - Workout Preference: ${profile.workoutPreference}
  `;

  let prompt = "";
  switch (strategy) {
    case PromptStrategy.BASIC:
      prompt = `Generate a weekly fitness plan and meal suggestions for this person: ${userContext}`;
      break;

    case PromptStrategy.ROLE_BASED:
      prompt = `
        You are an elite level Personal Trainer and Certified Nutritionist with 20 years of experience 
        helping thousands of clients achieve their goals. Your expertise is in creating sustainable, 
        highly effective plans tailored to individual limitations and goals.
        
        Current client profile:
        ${userContext}
        
        Based on your expertise, provide a detailed, encouraging, and science-backed fitness plan.
        Include:
        1. A 7-day workout schedule specific to their preference (${profile.workoutPreference}).
        2. Daily meal suggestions aligned with their ${profile.dietaryPreference} preference.
        3. General wellness and recovery advice.
        4. A mandatory medical disclaimer.
      `;
      break;

    case PromptStrategy.STRUCTURED:
      prompt = `
        Act as a fitness data architect. Analyze the following user profile and provide a structured plan.
        
        User Data:
        ${userContext}
        
        You MUST respond ONLY in the following JSON format:
        {
          "workoutPlan": "Detailed weekly workout plan",
          "mealSuggestions": "Daily nutritional guidance and meal ideas",
          "wellnessAdvice": "Specific recovery and sleep advice",
          "disclaimer": "Safety warning"
        }
        
        Ensure the values are richly detailed strings. Do not include any text outside the JSON.
      `;
      break;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ parts: [{ text: prompt }] }],
    config: strategy === PromptStrategy.STRUCTURED ? { responseMimeType: "application/json" } : undefined
  });

  const responseText = response.text || "";

  if (strategy === PromptStrategy.STRUCTURED) {
    try {
      const parsed = JSON.parse(responseText);
      return { ...parsed, promptStrategy: strategy };
    } catch (e) {
      console.error("Failed to parse structured JSON:", responseText);
      return {
        workoutPlan: responseText,
        mealSuggestions: "See main report",
        wellnessAdvice: "Recovery is key.",
        disclaimer: "Consult a professional.",
        promptStrategy: strategy,
      };
    }
  }

  return {
    workoutPlan: responseText,
    mealSuggestions: "Included in the main report",
    wellnessAdvice: "Included in the main report",
    disclaimer: "Consult a physician before starting any new exercise program.",
    promptStrategy: strategy,
    rawResponse: responseText
  };
}
