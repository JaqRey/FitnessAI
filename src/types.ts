/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum FitnessGoal {
  FAT_LOSS = "Fat Loss",
  MUSCLE_GAIN = "Muscle Gain",
  MAINTENANCE = "Maintenance",
}

export enum ActivityLevel {
  SEDENTARY = "Sedentary (Little to no exercise)",
  LIGHTLY_ACTIVE = "Lightly Active (1-3 days/week)",
  MODERATELY_ACTIVE = "Moderately Active (3-5 days/week)",
  VERY_ACTIVE = "Very Active (6-7 days/week)",
  EXTRA_ACTIVE = "Extra Active (Physical job or 2x training)",
}

export enum WorkoutPreference {
  HOME = "Home",
  GYM = "Gym",
}

export enum PromptStrategy {
  BASIC = "Basic",
  ROLE_BASED = "Role-Based",
  STRUCTURED = "Structured (JSON)",
}

export interface UserProfile {
  age: number;
  gender: string;
  weight: number;
  height: number;
  goal: FitnessGoal;
  activityLevel: ActivityLevel;
  dietaryPreference: string;
  workoutPreference: WorkoutPreference;
}

export interface FitnessPlan {
  workoutPlan: string;
  mealSuggestions: string;
  wellnessAdvice: string;
  disclaimer: string;
  promptStrategy: PromptStrategy;
  rawResponse?: string;
}
