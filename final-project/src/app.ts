import { StudentRepository, seedStudents } from "./data.js";
import { renderDirectory } from "./render.js";
import type { Program, ClassYear } from "./types.js";

const STORAGE_KEY = "student-directory";

document.addEventListener("DOMContentLoaded", () => {
    const savedStudents = localStorage.getItem(STORAGE_KEY);

    const students = savedStudents
        ? JSON.parse(savedStudents)
        : seedStudents;

    const repository = new StudentRepository(students);

    const allStudents = repository.getAllStudents();

    let nextId =
        allStudents.length > 0
            ? Math.max(...allStudents.map((student) => student.id)) + 1
            : 1;

    const searchInput =
        document.getElementById("search") as HTMLInputElement;

    const programFilter =
        document.getElementById("program-filter") as HTMLSelectElement;

    const resultCount =
        document.getElementById("result-count") as HTMLOutputElement;

    const form =
        document.getElementById("student-form") as HTMLFormElement;

    const firstNameInput =
        document.getElementById("first-name") as HTMLInputElement;

    const lastNameInput =
        document.getElementById("last-name") as HTMLInputElement;

    const emailInput =
        document.getElementById("email") as HTMLInputElement;

    const programSelect =
        document.getElementById("program") as HTMLSelectElement;

    const classYearSelect =
        document.getElementById("class-year") as HTMLSelectElement;

    const bioTextarea =
        document.getElementById("bio") as HTMLTextAreaElement;

    const skillsInput =
        document.getElementById("skills") as HTMLInputElement;

    const bioCount =
        document.getElementById("bio-count") as HTMLOutputElement;

    const firstNameError =
        document.getElementById("first-name-error") as HTMLParagraphElement;

    const lastNameError =
        document.getElementById("last-name-error") as HTMLParagraphElement;

    function updateDirectory(): void {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedProgram = programFilter.value;

        const filteredStudents = repository.findStudents((student) => {
            const fullName =
                `${student.firstName} ${student.lastName}`.toLowerCase();

            const matchesSearch =
                fullName.includes(searchTerm) ||
                student.skills.some((skill) =>
                    skill.toLowerCase().includes(searchTerm)
                );

            const matchesProgram =
                selectedProgram === "" ||
                student.program === selectedProgram;

            return matchesSearch && matchesProgram;
        });

        renderDirectory(filteredStudents);

        resultCount.value = `Showing ${filteredStudents.length} of ${
            repository.getAllStudents().length
        } students`;
    }

    function updateSkillSuggestions(): void {
        const skillOptions =
            document.getElementById("skill-options") as HTMLDataListElement;

        const allSkills = repository
            .getAllStudents()
            .flatMap((student) => student.skills);

        const uniqueSkills = [...new Set(allSkills)];

        skillOptions.innerHTML = "";

        uniqueSkills.forEach((skill) => {
            const option = document.createElement("option");
            option.value = skill;
            skillOptions.appendChild(option);
        });
    }

    function saveStudents(): void {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(repository.getAllStudents())
        );
    }

    searchInput.addEventListener("input", updateDirectory);
    programFilter.addEventListener("change", updateDirectory);

    bioTextarea.addEventListener("input", () => {
        bioCount.value = `${bioTextarea.value.length} / 300`;
    });

    const directory =
        document.getElementById("directory") as HTMLElement;

    directory.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        if (!target.matches("[data-delete-id]")) {
            return;
        }

        const studentId = Number(target.getAttribute("data-delete-id"));

        const confirmed = confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmed) {
            return;
        }

        repository.removeStudent(studentId);

        saveStudents();
        updateSkillSuggestions();
        updateDirectory();
    });

    firstNameInput.addEventListener("input", () => {
        if (firstNameInput.value.trim()) {
            firstNameError.classList.add("hidden");
            firstNameInput.removeAttribute("aria-invalid");
        }
    });

    lastNameInput.addEventListener("input", () => {
        if (lastNameInput.value.trim()) {
            lastNameError.classList.add("hidden");
            lastNameInput.removeAttribute("aria-invalid");
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();

        firstNameError.classList.add("hidden");
        lastNameError.classList.add("hidden");

        firstNameInput.removeAttribute("aria-invalid");
        lastNameInput.removeAttribute("aria-invalid");

        let hasError = false;

        if (!firstName) {
            firstNameError.classList.remove("hidden");
            firstNameInput.setAttribute("aria-invalid", "true");
            hasError = true;
        }

        if (!lastName) {
            lastNameError.classList.remove("hidden");
            lastNameInput.setAttribute("aria-invalid", "true");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const skills = skillsInput.value
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "");

        const newStudent = {
            id: nextId,
            firstName,
            lastName,
            email: emailInput.value.trim(),
            program: programSelect.value as Program,
            year: classYearSelect.value as ClassYear,
            bio: bioTextarea.value.trim(),
            skills,
        };

        repository.addStudent(newStudent);

        nextId++;

        saveStudents();

        form.reset();

        bioCount.value = "0 / 300";

        updateSkillSuggestions();
        updateDirectory();
    });

    updateSkillSuggestions();
    updateDirectory();
});