// Reusable Student class: stores identity and subject marks.
export class Student {
    constructor(id, name, marks) {
        this.id = Number(id);
        this.name = String(name).trim();
        this.marks = { ...marks };
    }

    // Arrow function calculates the total of all subject marks.
    totalMarks = () => Object.values(this.marks).reduce((total, mark) => total + mark, 0);

    // Average is based on the number of subjects recorded.
    averageMarks = () => {
        const values = Object.values(this.marks);
        return values.length === 0 ? 0 : this.totalMarks() / values.length;
    };

    // Defined grading scale: A+ >= 90, A >= 80, B >= 70,
    // C >= 60, D >= 50, otherwise F.
    grade = () => {
        const average = this.averageMarks();
        if (average >= 90) return "A+";
        if (average >= 80) return "A";
        if (average >= 70) return "B";
        if (average >= 60) return "C";
        if (average >= 50) return "D";
        return "F";
    };

    // A student passes only if every subject mark is at least 35.
    passFail = () => Object.values(this.marks).every(mark => mark >= 35) ? "PASS" : "FAIL";

    toRecord = () => ({
        id: this.id,
        name: this.name,
        marks: { ...this.marks },
        total: this.totalMarks(),
        average: Number(this.averageMarks().toFixed(2)),
        grade: this.grade(),
        status: this.passFail()
    });
}
