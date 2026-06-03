import { patterns } from "../data/patterns.js";

// Returns a summary of all available patterns
// This is what Claude sees when it calls list_patterns
export function listPatterns() {
  return patterns.map(p => ({
    id: p.id,
    name: p.name,
    wcagRef: p.wcagRef,
    summary: p.summary,
    learnMoreUrl: p.learnMoreUrl
  }));
}
