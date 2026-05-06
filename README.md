# TitanAI - Personal Fitness Companion

A full-stack, AI-powered fitness application built with React, Express, and Gemini AI. This project demonstrates high-performance web architecture coupled with advanced **Prompt Engineering** techniques.

## Features
- **Biometric Integration**: Personalized plans based on age, weight, height, and goal.
- **Dynamic Workouts**: Supports both Home and Gym preferences.
- **Nutritional Architect**: Tailored meal suggestions based on dietary preferences.
- **Prompt Engineering Lab**: Built-in comparison of 3 different prompting strategies to showcase how AI response quality changes.

## Prompt Engineering Strategies Explained

This project implements three distinct strategies to demonstrate LLM capabilities:

### 1. Basic Prompting
- **Logic**: Simple directive without much context.
- **Result**: Usually generic, shorter, and less specific. It relies on the AI to "guess" the desired format.
- **Use Case**: Quick discovery or broad queries.

### 2. Role-Based Prompting (The "Titan" Expert)
- **Logic**: Assigns a persona (Elite Personal Trainer & Nutritionist) and adds a pedigree ("20 years experience").
- **Result**: High-quality, professional, and authoritative tone. The advice feels more personalized and science-backed.
- **Use Case**: User-facing applications where authority and trust are key.

### 3. Structured / JSON Prompting
- **Logic**: Strictly mandates a JSON schema and forbids any other text output. 
- **Result**: Perfect for integration with software systems. It ensures the frontend can reliably parse and display data in individual cards/sections.
- **Use Case**: Production applications requiring reliable data structures.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS 4, Framer Motion (for animations).
- **Backend**: Express.js (Node.js/TypeScript).
- **AI**: Google Gemini 2.0 Flash (`@google/genai`).
- **Icons**: Lucide React.
- **Styling**: Cyberpunk/Obsidion Dark theme with neon accents.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root (use `.env.example` as a template):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

## Folder Structure
- `/server.ts` - Express backend with AI routing.
- `/src/App.tsx` - Main React application UI.
- `/src/types.ts` - Shared TypeScript interfaces.
- `/src/index.css` - Custom Tailwind theme and layer styles.
