import type { Student } from "./types";

export function renderDirectory(students: Student[]): void {
  const directory = document.getElementById("directory") as HTMLElement;

  directory.className =
    "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

  directory.innerHTML = "";

  students.forEach((student) => {
    const card = document.createElement("article");

    card.className =
      "student-card group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500";

    const photo = student.photoUrl
      ? `<img
          src="${student.photoUrl}"
          alt="${student.firstName} ${student.lastName}"
          class="h-48 w-full object-cover"
        >`
      : `
        <div
          class="flex h-48 w-full items-center justify-center bg-slate-200 text-4xl font-bold text-slate-500"
          aria-label="No photo available"
        >
          ${student.firstName.charAt(0)}${student.lastName.charAt(0)}
        </div>
      `;

    card.innerHTML = `
      ${photo}

      <div class="p-6">
        <h2 class="text-xl font-bold tracking-tight text-slate-900">
          ${student.firstName} ${student.lastName}
        </h2>

        <p class="mt-1 text-sm font-medium text-blue-600">
          ${student.program}
        </p>

        <p class="mt-1 text-sm text-slate-600">
          ${student.year}
        </p>

        <button
          type="button"
          data-delete-id="${student.id}"
          class="mt-5 w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    `;

    directory.appendChild(card);
  });
}