import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Student } from "./Student.js";
import {
    makeStudent, addStudents, findStudentById, filterStudentsByGrade,
    rankStudents, formatReport
} from "./studentUtils.js";
import { loadStudents, saveStudents } from "./storage.js";

const rl = createInterface({ input, output });
let students = [];

const ask = async (question) => (await rl.question(question)).trim();

async function addStudent() {
    try {
        const id = await ask("Student ID: ");
        const name = await ask("Student name: ");
        const countText = await ask("Number of subjects: ");
        const count = Number(countText);
        if (!Number.isInteger(count) || count <= 0) {
            throw new Error("Number of subjects must be a positive integer.");
        }

        const marks = {};
        for (let i = 0; i < count; i++) {
            const subject = await ask(`Subject ${i + 1} name: `);
            const mark = await ask(`Marks for ${subject}: `);
            if (Object.keys(marks).some(s => s.toLowerCase() === subject.toLowerCase())) {
                throw new Error("Duplicate subject name.");
            }
            marks[subject] = mark;
        }

        const student = makeStudent({ id, name, marks });
        if (students.some(existing => existing.id === student.id)) {
            throw new Error(`Student ID ${student.id} already exists.`);
        }

        students = addStudents(students, student);
        console.log("\nStudent added successfully.\n");
        console.log(formatReport([student]));
    } catch (error) {
        console.log(`Input error: ${error.message}`);
    }
}

async function searchStudent() {
    const id = await ask("Enter student ID: ");
    const student = findStudentById(students, id);
    console.log(student ? formatReport([student]) : "Student not found.");
}

async function filterByGrade() {
    const grade = await ask("Enter grade (A+, A, B, C, D, F): ");
    const result = filterStudentsByGrade(students, grade);
    console.log(formatReport(result));
}

async function loadFromFile() {
    try {
        students = await loadStudents();
        console.log(`Loaded ${students.length} student record(s).`);
    } catch (error) {
        console.log(`File error: ${error.message}`);
    }
}

async function saveToFile() {
    try {
        await saveStudents(students);
        console.log(`Saved ${students.length} student record(s) to data/students.json.`);
    } catch (error) {
        console.log(`File error: ${error.message}`);
    }
}

async function main() {
    console.log("Student Performance Management System");
    await loadFromFile();

    let running = true;
    while (running) {
        console.log(`
1. Add student
2. Display report (ranked by average)
3. Search student by ID
4. Filter students by grade
5. Sort students by average marks
6. Save records to JSON
7. Load records from JSON
0. Exit`);
        const choice = await ask("Choose an option: ");

        switch (choice) {
            case "1": await addStudent(); break;
            case "2": console.log(formatReport(students)); break;
            case "3": await searchStudent(); break;
            case "4": await filterByGrade(); break;
            case "5": console.log(formatReport(rankStudents(students))); break;
            case "6": await saveToFile(); break;
            case "7": await loadFromFile(); break;
            case "0": running = false; break;
            default: console.log("Invalid menu option. Enter a listed option.");
        }
    }

    rl.close();
    console.log("Application closed.");
}

main().catch(error => {
    console.error(`Unexpected application error: ${error.message}`);
    rl.close();
    process.exitCode = 1;
});
