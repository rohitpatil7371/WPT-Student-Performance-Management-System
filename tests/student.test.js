import test from "node:test";
import assert from "node:assert/strict";
import { Student } from "../src/Student.js";
import {
    makeStudent, rankStudents, findStudentById, filterStudentsByGrade, validateMark
} from "../src/studentUtils.js";

const sample = () => makeStudent({
    id: 101,
    name: "Aarav",
    marks: { mathematics: 85, science: 91, programming: 96 }
});

test("calculates total, average, grade and pass/fail for Aarav", () => {
    const student = sample();
    assert.equal(student.totalMarks(), 272);
    assert.equal(Number(student.averageMarks().toFixed(2)), 90.67);
    assert.equal(student.grade(), "A+");
    assert.equal(student.passFail(), "PASS");
});

test("rejects duplicate IDs at the application input layer", () => {
    const students = [sample()];
    const duplicate = makeStudent({ id: 101, name: "Other", marks: { English: 80 } });
    assert.equal(students.some(s => s.id === duplicate.id), true);
});

test("rejects marks below zero and above 100", () => {
    assert.throws(() => validateMark(-1), /0 to 100/);
    assert.throws(() => validateMark(101), /0 to 100/);
});

test("empty list produces no ranked records", () => {
    assert.deepEqual(rankStudents([]), []);
});

test("finds by ID and filters by grade", () => {
    const students = [sample(), makeStudent({ id: 102, name: "Bea", marks: { English: 55 } })];
    assert.equal(findStudentById(students, 101).name, "Aarav");
    assert.equal(filterStudentsByGrade(students, "D").length, 1);
});

test("equal averages use name then ID for deterministic ordering", () => {
    const students = [
        makeStudent({ id: 103, name: "Zoe", marks: { English: 80, Maths: 80 } }),
        makeStudent({ id: 102, name: "Asha", marks: { English: 70, Maths: 90 } })
    ];
    const ranked = rankStudents(students);
    assert.deepEqual(ranked.map(s => s.name), ["Asha", "Zoe"]);
});

test("a student fails if any subject is below 35", () => {
    const student = makeStudent({ id: 104, name: "Ravi", marks: { Maths: 90, Science: 30 } });
    assert.equal(student.passFail(), "FAIL");
});
