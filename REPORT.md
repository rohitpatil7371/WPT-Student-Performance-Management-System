# Student Performance Management System Using Node.js

## 1. Introduction
The Student Performance Management System is a command-line application developed with Node.js and ES6+ JavaScript. It stores student IDs, names, subject marks, calculates academic results, and produces formatted reports.

## 2. Objectives
- Accept student names, IDs, subjects and marks.
- Store records in arrays and objects.
- Calculate total marks, average, grade and pass/fail status.
- Search by ID, filter by grade and sort by average.
- Save and retrieve records using a JSON file.
- Handle invalid input and file errors.

## 3. Methodology
The program uses a `Student` class to represent a student. Utility functions validate records, calculate/report results, search by ID, filter by grade and rank students. A command-line menu accepts input. The storage module uses asynchronous `readFile` and `writeFile` from `node:fs/promises`.

### Grading scale
A+ >= 90; A >= 80; B >= 70; C >= 60; D >= 50; F < 50.
A student passes only if each subject mark is at least 35. Marks must be in the inclusive range 0–100. IDs must be positive integers and unique.

## 4. Browser JavaScript vs Node.js
### Accessing local files
Node.js provides filesystem APIs, including `node:fs/promises`, allowing the application to read and write `data/students.json`. Browser JavaScript normally cannot freely read or write arbitrary local files because browser access is restricted for security and privacy. A browser can work with files selected by a user or use specific browser APIs, but that is not the same as unrestricted filesystem access.

### Security restrictions and runtime
Browser JavaScript runs in a browser environment with DOM and web APIs and security boundaries around local resources. Node.js runs outside the browser and provides server/runtime APIs such as filesystem, process and command-line input/output. Node.js can access files that the operating-system user running the process is permitted to access.

### Browser interface communicating with Node.js
A browser-based interface can send HTTP requests to a Node.js backend using `fetch` or Axios. The backend validates the request, performs file/database operations, and returns a JSON response. The current assignment is a command-line application, so an HTTP server is not required for its core implementation.

### Separation of responsibilities
The frontend can focus on display, user interaction and client-side validation. The backend can handle persistent storage, authoritative validation, business rules and controlled access to data. This separation allows each part to evolve independently. For this command-line project, Node.js directly handles both the command-line interaction and file persistence.

## 5. Node.js REPL experiments
Expressions and expected outputs are in `repl/experiments.md`. They cover grade calculation, array filtering/sorting, destructuring, arrow functions, template literals and error handling.

## 6. Implementation details
- `Student.js`: class, constructor, total, average, grade, pass/fail and record conversion.
- `studentUtils.js`: mark validation, record creation, spread/rest, search, grade filter, ranking and formatted reports.
- `storage.js`: asynchronous JSON save/load; missing file returns an empty list; malformed JSON is reported.
- `app.js`: command-line menu and input handling.

## 7. Testing and evaluation
The automated tests are in `tests/student.test.js`. The following cases are covered or handled:
- Valid student: calculates total, average, grade and status.
- Duplicate IDs: rejected by the command-line input layer.
- Marks below 0 or above 100: rejected by validation.
- Empty list: report says no records; ranking returns an empty array.
- Missing JSON file: loading starts with an empty list.
- Malformed JSON: clear file error is displayed.
- Equal averages: deterministic order by name, then ID.
- One subject below 35: student status is FAIL.

## 8. ES6+ feature usage
- `let` and `const`: declarations for values and bindings.
- Arrow functions: calculations, sorting, filtering and transformations.
- Template literals: formatted reports and prompts.
- Destructuring: extracting student properties and ID in search.
- Spread syntax: copying marks/arrays; rest syntax: accepting multiple added records.
- Classes and constructors: `Student` class.
- ES modules: `import` and `export` between source files.
- Promises/async-await: asynchronous JSON read/write and command-line operations.

## 9. Conclusion
The project demonstrates a Node.js command-line system that manages student records, calculates results, sorts and filters data, and persists records in JSON. It uses the required ES6+ features and handles common input and file errors.
