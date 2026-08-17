import type { Student } from "./types";

export class StudentRepository {
  private students: Student[];

  constructor(initialStudents: Student[]) {
    this.students = initialStudents;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  removeStudent(id: number): boolean {
    const originalLength = this.students.length;

    this.students = this.students.filter((student) => student.id !== id);

    return this.students.length < originalLength;
  }

  getAllStudents(): Student[] {
    return this.students;
  }

  findStudents(
    predicate: (student: Student) => boolean
  ): Student[] {
    return this.students.filter(predicate);
  }
}

export const seedStudents: Student[] = [
  {
    id: 1,
    firstName: "Ava",
    lastName: "Martinez",
    program: "Web Development",
    year: "Freshman",
    email: "ava.martinez@northstar.edu",
    bio: "A creative student interested in front-end development and accessible web design.",
    skills: ["HTML", "CSS", "JavaScript"],
    gpa: 3.8,
    photoUrl: "assets/photos/student1.jpg",
  },
  {
    id: 2,
    firstName: "Mary",
    lastName: "Johnson",
    program: "Cybersecurity",
    year: "Sophomore",
    email: "mary.johnson@northstar.edu",
    bio: "Interested in network security, ethical hacking, and protecting digital systems.",
    skills: ["Linux", "Networking", "Python"],
    gpa: 3.6,
    photoUrl: "assets/photos/student2.jpg",
  },
  {
    id: 3,
    firstName: "James",
    lastName: "Thomas",
    program: "Robotics",
    year: "Junior",
    email: "james.thomas@northstar.edu",
    bio: "Enjoys combining programming and engineering to build practical robotic systems.",
    skills: ["Python", "Arduino", "C++"],
    photoUrl: "assets/photos/student3.jpg",
  },
  {
    id: 4,
    firstName: "Erin",
    lastName: "Williams",
    program: "Networking",
    year: "Senior",
    email: "erin.williams@northstar.edu",
    bio: "Focused on network infrastructure and cloud technologies.",
    skills: ["Cisco", "Linux", "Cloud Computing"],
    gpa: 3.4,
    photoUrl: "assets/photos/student4.jpg",
  },
  {
    id: 5,
    firstName: "Olivia",
    lastName: "Brown",
    program: "Business",
    year: "Sophomore",
    email: "olivia.brown@northstar.edu",
    bio: "Interested in entrepreneurship, marketing, and technology-driven business.",
    skills: ["Marketing", "Excel", "Communication"],
    photoUrl: "assets/photos/student5.jpg",
  },
  {
    id: 6,
    firstName: "Sarah",
    lastName: "Davis",
    program: "Web Development",
    year: "Junior",
    email: "sarah.davis@northstar.edu",
    bio: "Enjoys building interactive applications and learning modern development tools.",
    skills: ["TypeScript", "React", "Git"],
    gpa: 3.9,
    photoUrl: "assets/photos/student6.jpg",
  },
  {
    id: 7,
    firstName: "Emma",
    lastName: "Wilson",
    program: "Cybersecurity",
    year: "Senior",
    email: "emma.wilson@northstar.edu",
    bio: "Passionate about digital forensics and helping organizations improve security.",
    skills: ["Digital Forensics", "Python", "Security"],
    photoUrl: "assets/photos/student7.jpg",
  },
  {
    id: 8,
    firstName: "Mia",
    lastName: "Anderson",
    program: "Robotics",
    year: "Freshman",
    email: "mia.anderson@northstar.edu",
    bio: "A beginner programmer who enjoys experimenting with electronics and automation.",
    skills: ["Arduino", "Python", "3D Printing"],
    gpa: 3.2,
    photoUrl: "assets/photos/student8.jpg",
  },
  {
    id: 9,
    firstName: "Liam",
    lastName: "Taylor",
    program: "Networking",
    year: "Junior",
    email: "liam.taylor@northstar.edu",
    bio: "Interested in network administration, infrastructure, and cloud computing.",
    skills: ["Networking", "Cisco", "AWS"],
    photoUrl: "assets/photos/student9.jpg",
  },
  {
    id: 10,
    firstName: "Sophia",
    lastName: "Chen",
    program: "Business",
    year: "Senior",
    email: "sophia.chen@northstar.edu",
    bio: "Focused on project management and using technology to improve business operations.",
    skills: ["Project Management", "Excel", "Leadership"],
    gpa: 3.7,
  },
];