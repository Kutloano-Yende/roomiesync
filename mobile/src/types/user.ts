/**
 * Shared User type. Field shape is deliberately aligned with the
 * documented STUDENTS entity (see docs/architecture-decisions.md and the
 * RoomieSync technical requirements) so a real backend response can be
 * dropped in later without changing how screens consume this type.
 */
export interface User {
  id: string;
  fullName: string;
  initials: string;
  email: string;
  studentNumber: string;
  university: string;
  accommodationType: string;
}
