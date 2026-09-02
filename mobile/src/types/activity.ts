export type ActivityMetaTone = "warning" | "neutral" | "action" | "success";
export type ActivityKind = "expense" | "matchRequest" | "feedback";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  subtitle: string;
  meta: string;
  metaTone: ActivityMetaTone;
}
