import { portfolioData } from "../../../src/data/portfolioData.js";

/** Serialize the existing portfolio source of truth for the server model prompt. */
export function getPortfolioContext(): string {
  return JSON.stringify({
    profile: portfolioData.profile,
    projects: portfolioData.projects,
    skills: portfolioData.skillCategories,
    journey: portfolioData.journey,
  });
}
