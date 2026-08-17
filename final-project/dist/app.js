import { StudentRepository, seedStudents } from "./data.js";
import { renderDirectory } from "./render.js";
const STORAGE_KEY = "student-directory";
document.addEventListener("DOMContentLoaded", () => {
    const savedStudents = localStorage.getItem(STORAGE_KEY);
    const students = savedStudents
        ? JSON.parse(savedStudents)
        : seedStudents;
    const repository = new StudentRepository(students);
    const allStudents = repository.getAllStudents();
    let nextId = allStudents.length > 0
        ? Math.max(...allStudents.map((student) => student.id)) + 1
        : 1;
    const searchInput = document.getElementById("search");
    const programFilter = document.getElementById("program-filter");
    const resultCount = document.getElementById("result-count");
    const form = document.getElementById("student-form");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const programSelect = document.getElementById("program");
    const classYearSelect = document.getElementById("class-year");
    const bioTextarea = document.getElementById("bio");
    const skillsInput = document.getElementById("skills");
    const bioCount = document.getElementById("bio-count");
    const firstNameError = document.getElementById("first-name-error");
    const lastNameError = document.getElementById("last-name-error");
    function updateDirectory() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedProgram = programFilter.value;
        const filteredStudents = repository.findStudents((student) => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            const matchesSearch = fullName.includes(searchTerm) ||
                student.skills.some((skill) => skill.toLowerCase().includes(searchTerm));
            const matchesProgram = selectedProgram === "" ||
                student.program === selectedProgram;
            return matchesSearch && matchesProgram;
        });
        renderDirectory(filteredStudents);
        resultCount.value = `Showing ${filteredStudents.length} of ${repository.getAllStudents().length} students`;
    }
    function updateSkillSuggestions() {
        const skillOptions = document.getElementById("skill-options");
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
    function saveStudents() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(repository.getAllStudents()));
    }
    searchInput.addEventListener("input", updateDirectory);
    programFilter.addEventListener("change", updateDirectory);
    bioTextarea.addEventListener("input", () => {
        bioCount.value = `${bioTextarea.value.length} / 300`;
    });
    const directory = document.getElementById("directory");
    directory.addEventListener("click", (event) => {
        const target = event.target;
        if (!target.matches("[data-delete-id]")) {
            return;
        }
        const studentId = Number(target.getAttribute("data-delete-id"));
        const confirmed = confirm("Are you sure you want to delete this student?");
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
            program: programSelect.value,
            year: classYearSelect.value,
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
