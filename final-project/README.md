# Student Directory

## Project Description

Student Directory is a responsive web application built with TypeScript, HTML, Tailwind CSS, and browser Web APIs. The application allows users to view, search, filter, add, and delete student records.

Student information is stored in a TypeScript repository and persisted in the browser using `localStorage`. The directory uses responsive Tailwind utility classes so the student cards adapt to different screen sizes.

---

# UI Plan

Before building the UI, I planned the application around a simple Student directory with reusable student cards and a form for adding students.

## Student Fields

Each Student has the following fields:

- **ID** — required number used to uniquely identify each student.
- **First name** — required string.
- **Last name** — required string.
- **Program** — required; one of the defined Program options.
- **Class year** — required; Freshman, Sophomore, Junior, or Senior.
- **Email** — required string.
- **Bio** — string containing information about the student.
- **Skills** — string array containing the student's skills.
- **GPA** — optional number.
- **Photo URL** — optional string.

## Views / Screens

The application includes:

- **Student Directory** — a responsive grid of student cards.
- **Search and Filter Controls** — live search by name or skill and a Program filter.
- **Add Student Form** — a form separated into Personal Information and Academic Information fieldsets.
- **Empty/Loading State** — the directory begins empty in the HTML and can display a loading/empty state before TypeScript renders the students.
- **Live Results** — an output showing how many students are currently displayed.

## Rough Layout

```text
+----------------------------------------------------------+
|                    Student Directory                     |
+----------------------------------------------------------+

+----------------------------------------------------------+
| Search Students              Filter by Program           |
| [ Search...             ]    [ All Programs       v ]    |
+----------------------------------------------------------+

              Showing 10 of 10 students

+----------------+  +----------------+  +----------------+
|     Photo      |  |     Photo      |  |     Photo      |
|                |  |                |  |                |
| Jane Smith     |  | John Doe       |  | Student Name   |
| Web Development|  | Cybersecurity  |  | Business       |
| Junior         |  | Sophomore      |  | Senior         |
|                |  |                |  |                |
|    [ Delete ]  |  |    [ Delete ]  |  |    [ Delete ]  |
+----------------+  +----------------+  +----------------+

+----------------------------------------------------------+
| Add a Student                                            |
|                                                          |
| Personal Information                                     |
| First Name        [                         ]            |
| Last Name         [                         ]            |
| Email             [                         ]            |
| Bio               [                         ]            |
|                   0 / 300                                |
|                                                          |
| Academic Information                                     |
| Program           [ Select a program              v ]    |
| Class Year        [ Select class year             v ]    |
| Skills            [                         ]            |
|                                                          |
|                  [ Save ] [ Reset ]                      |
+----------------------------------------------------------+

---

# Required TypeScript Concepts

The following required TypeScript concepts are used in the project:

| Concept                       | Where It Is Used                                                                          |
|---                            |---                                                                                        |
| **interface**                 | `src/types.ts` — The `Student` interface defines the structure of student records.        |
| **union type**                | `src/types.ts` — `Program` and `ClassYear` are union types containing the allowed values. |
| **class + access modifiers**  | `src/data.ts` — `StudentRepository` is a class with a private `students` array and public methods such as `addStudent()`, `removeStudent()`, `getAllStudents()`, and `findStudents()`. |
| **type assertion (`as`)**     | `src/app.ts` and `src/render.ts` — DOM elements are cast to specific HTML element types such as `HTMLInputElement`, `HTMLSelectElement`, `HTMLFormElement`, and `HTMLOutputElement`. |

---

# Required Web API Interfaces

The project uses the required browser DOM interfaces:

| Interface                 | Where It Is Used                                                                                      |
|---                        |---                                                                                                    |
| **HTMLFormElement**       | `src/app.ts` — The `student-form` add-student form is accessed and handled as an `HTMLFormElement`.   |
| **HTMLFieldSetElement**   | `index.html` — The form contains Personal Information and Academic Information fieldsets.             |
| **HTMLLabelElement**      | `index.html` — Form controls have associated labels using matching `for` and `id` attributes.         |
| **HTMLInputElement**      | `src/app.ts` — Used for the search input, first name, last name, email, and skills inputs.            |
| **HTMLSelectElement**     | `src/app.ts` — Used for the Program and Class Year form fields and the Program filter.                |
| **HTMLTextAreaElement**   | `src/app.ts` — Used for the student bio field.                                                        |
| **HTMLButtonElement**     | `index.html` and `src/render.ts` — Used for Save, Reset, and Delete buttons.                          |
| **HTMLOutputElement**     | `index.html` and `src/app.ts` — Used for the live bio character counter and the live student result count. |
| **HTMLDataListElement**   | `index.html` and `src/app.ts` — Used for skill suggestions attached to the skills input.              |
| **HTMLOptionElement**     | `src/app.ts` — Skill `<option>` elements are generated dynamically from the students' skills.         |

---

# Features

## Live Search

The directory includes a search input that filters students as the user types.

Search matches against:

- Student first and last name
- Student skills

The search uses the repository's `findStudents()` method.

## Program Filter

The Program filter works together with the search field.

For example, searching for `python` while selecting `Cybersecurity` only displays students who match both conditions.

## Live Results

The results output updates whenever the search term or program filter changes.

Example:

```text
Showing 5 of 10 students