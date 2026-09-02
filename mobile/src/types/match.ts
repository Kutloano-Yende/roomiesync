/**
 * Summary shape for a matched/suggested student, as shown on cards
 * throughout the app (dashboard top match, match suggestions list, etc.).
 */
export interface MatchSummary {
  id: string;
  fullName: string;
  initials: string;
  pronouns?: string;
  residence: string;
  compatibilityScore: number;
  avatarColor: string;
}
