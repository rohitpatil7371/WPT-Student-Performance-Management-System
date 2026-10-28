# Student Performance Management System Using Node.js

## Objective
A command-line application using Node.js and ES6+ to manage student records, calculate academic performance, search/filter/rank students, and save/load JSON records.

## Requirements
- Node.js 22 or compatible modern Node.js.
- No third-party packages are required.

## Run
From this folder:
```bash
npm start
```

Run automated tests:
```bash
npm test
```

## Menu
1. Add student (ID, name, subjects and marks)
2. Display formatted report
3. Search student by ID
4. Filter students by grade
5. Sort students by average marks
6. Save records to `data/students.json`
7. Load records from `data/students.json`
0. Exit

## Grading scale
- A+: average >= 90
- A: average >= 80
- B: average >= 70
- C: average >= 60
- D: average >= 50
- F: average < 50

Pass/fail rule: a student passes only when every subject mark is at least 35. Marks must be numeric and between 0 and 100. Student IDs must be positive integers and unique.

## Files
- `src/Student.js`: Student class and performance calculations.
- `src/studentUtils.js`: validation, search, filtering, sorting and report formatting.
- `src/storage.js`: asynchronous JSON save/load and file error handling.
- `src/app.js`: command-line menu.
- `data/students.json`: saved records.
- `repl/experiments.md`: REPL expressions and explanations.
- `tests/student.test.js`: automated tests.
- `REPORT.pdf` and `REPORT.docx`: project report.
- `screenshots/`: execution evidence.

## ES6+ features used
`let`/`const`, arrow functions, template literals, destructuring, spread/rest syntax, classes and constructors, ES modules, and async/await for file operations.

## Browser JavaScript vs Node.js
See the project report. Node.js is used because this is a command-line application that must access a JSON file through the filesystem APIs. A browser interface could call a Node.js backend over HTTP, while the backend validates data and reads/writes the file.
