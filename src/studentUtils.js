import { Student } from "./Student.js";

// Validate one subject mark. Marks must be numeric and between 0 and 100.
export const validateMark = (value) => {
    const mark = Number(value);
    if (value === "" || !Number.isFinite(mark) || mark < 0 || mark > 100) {
        throw new Error("Each mark must be a number from 0 to 100.");
    }
    return mark;
};

// Validate and normalize a student object.
export const makeStudent = ({ id, name, marks }) => {
    const studentId = Number(id);
    if (!Number.isInteger(studentId) || studentId <= 0) {
        throw new Error("Student ID must be a positive integer.");
    }
    if (typeof name !== "string" || name.trim() === "") {
        throw new Error("Student name cannot be empty.");
    }
    if (!marks || typeof marks !== "object" || Array.isArray(marks) ||
        Object.keys(marks).length === 0) {
        throw new Error("Enter at least one subject and mark.");
    }

    const cleanMarks = {};
    for (const [subject, rawMark] of Object.entries(marks)) {
        if (subject.trim() === "") throw new Error("Subject name cannot be empty.");
        cleanMarks[subject.trim()] = validateMark(rawMark);
    }
    return new Student(studentId, name.trim(), cleanMarks);
};

// Spread syntax creates a new array; rest syntax gathers all supplied records.
export const addStudents = (students, ...newStudents) => [...students, ...newStudents];

// Rank students by average, highest first. Equal averages are sorted by name,
// then ID, to produce deterministic ranking.
export const rankStudents = (students) => [...students].sort((a, b) =>
    b.averageMarks() - a.averageMarks() ||
    a.name.localeCompare(b.name) ||
    a.id - b.id
);

// Destructuring extracts id, name and marks to search by ID.
export const findStudentById = (students, searchId) => {
    const id = Number(searchId);
    return students.find(({ id: studentId }) => studentId === id);
};

// Filter by the calculated grade.
export const filterStudentsByGrade = (students, targetGrade) =>
    students.filter(student => student.grade() === targetGrade.trim().toUpperCase());

export const formatStudent = (student) => {
    const { id, name, marks } = student;
    const subjectLines = Object.entries(marks)
        .map(([subject, mark]) => `  ${subject}: ${mark}`)
        .join("\n");
    return `${name} (ID: ${id})\n${subjectLines}\n  Total: ${student.totalMarks()}` +
        ` | Average: ${student.averageMarks().toFixed(2)} | Grade: ${student.grade()}` +
        ` | Status: ${student.passFail()}`;
};

export const formatReport = (students) => {
    if (students.length === 0) return "No student records available.";
    return rankStudents(students).map((student, index) =>
        `${index + 1}. ${formatStudent(student)}`
    ).join("\n\n");
};
