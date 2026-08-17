export type Program =
  | "Web Development"
  | "Cybersecurity"
  | "Networking"
  | "Robotics"
  | "Business";

export type ClassYear =
  | "Freshman"
  | "Sophomore"
  | "Junior"
  | "Senior";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  program: Program;
  year: ClassYear;
  email: string;
  bio: string;
  skills: string[];
  gpa?: number;
  photoUrl?: string;
}