import { readFile, writeFile } from "node:fs/promises";
import { Student } from "./Student.js";
import { makeStudent } from "./studentUtils.js";

export const DATA_FILE = new URL("../data/students.json", import.meta.url);

// Save all student records asynchronously as readable JSON.
export const saveStudents = async (students) => {
    const records = students.map(student => student.toRecord());
    await writeFile(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
};

// Load records asynchronously. Missing file returns an empty list; malformed
// JSON and invalid records produce clear errors for the caller.
export const loadStudents = async () => {
    let content;
    try {
        content = await readFile(DATA_FILE, "utf8");
    } catch (error) {
        if (error.code === "ENOENT") return [];
        throw new Error(`Could not read data file: ${error.message}`);
    }

    let records;
    try {
        records = JSON.parse(content);
    } catch {
        throw new Error("The student JSON file is malformed. Fix or replace it before loading.");
    }

    if (!Array.isArray(records)) {
        throw new Error("The student JSON file must contain an array of student records.");
    }

    return records.map(record => {
        // Stored computed fields are ignored; metrics are recalculated from marks.
        const student = makeStudent({
            id: record.id,
            name: record.name,
            marks: record.marks
        });
        return new Student(student.id, student.name, student.marks);
    });
};
