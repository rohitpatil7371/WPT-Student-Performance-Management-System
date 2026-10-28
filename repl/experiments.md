# Node.js REPL experiments

Start the REPL by running `node` in the project folder. Type each expression after the `>` prompt.

## 1. Grade calculation
```js
const average = (marks) => marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
average([85, 91, 96])
// 90.66666666666667
const grade = (avg) => avg >= 90 ? "A+" : avg >= 80 ? "A" : avg >= 70 ? "B" : avg >= 60 ? "C" : avg >= 50 ? "D" : "F";
grade(average([85, 91, 96]))
// 'A+'
```
Explanation: the average is about 90.67, so the defined scale returns A+.

## 2. Array filtering and sorting
```js
const students = [
  { id: 101, name: "Aarav", average: 90.67, grade: "A+" },
  { id: 102, name: "Bea", average: 68, grade: "C" },
  { id: 103, name: "Asha", average: 80, grade: "A" }
];
students.filter(s => s.grade === "A").map(s => s.name)
// [ 'Asha' ]
[...students].sort((a, b) => b.average - a.average).map(s => s.name)
// [ 'Aarav', 'Asha', 'Bea' ]
```
Explanation: filter selects matching grades; sort arranges averages high to low. Spread copies the array before sorting.

## 3. Destructuring
```js
const student = { id: 101, name: "Aarav", marks: { mathematics: 85, science: 91, programming: 96 } };
const { id, name, marks } = student;
id
// 101
name
// 'Aarav'
marks.science
// 91
```
Explanation: destructuring extracts properties into variables.

## 4. Arrow function and template literal
```js
const total = marks => marks.reduce((sum, mark) => sum + mark, 0);
const name = "Aarav";
`Student ${name} scored ${total([85, 91, 96])}`
// 'Student Aarav scored 272'
```
Explanation: arrow functions define compact functions; template literals interpolate expressions using ${...}.

## 5. Error handling with invalid values
```js
const validateMark = mark => {
  if (!Number.isFinite(mark) || mark < 0 || mark > 100) throw new Error("Invalid mark");
  return mark;
};
try { validateMark(120); } catch (error) { error.message; }
// 'Invalid mark'
```
Explanation: 120 is outside the valid 0–100 range, so the function throws an error and catch handles it.
