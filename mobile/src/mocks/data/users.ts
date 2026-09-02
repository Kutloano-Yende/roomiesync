import { User } from "../../types/user";

/**
 * MOCK DATA — not a real user database.
 *
 * Demo account, matching the example shown in the RoomieSync UI prototype
 * (Screen 1: Login), used so the app is demonstrable without a backend.
 *
 * Demo login: 221592280@tut4life.ac.za / roomiesync
 */
export const MOCK_DEMO_USER: User = {
  id: "mock-user-1",
  fullName: "BT Masilela",
  initials: "BT",
  email: "221592280@tut4life.ac.za",
  studentNumber: "221592280",
  university: "Tshwane University of Technology",
  accommodationType: "University residence",
};

export const MOCK_DEMO_PASSWORD = "roomiesync";
