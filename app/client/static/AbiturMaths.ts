export function GradeToPoints900(grade: number): number {
    return Math.round(900 - (grade - 1) * 60);
}

export function PointsToGrade900(points: number): number {
      const gradeTable: { min: number; max: number; grade: number }[] = [
    { min: 823, max: 900, grade: 1.0 },
    { min: 805, max: 822, grade: 1.1 },
    { min: 787, max: 804, grade: 1.2 },
    { min: 769, max: 786, grade: 1.3 },
    { min: 751, max: 768, grade: 1.4 },
    { min: 733, max: 750, grade: 1.5 },
    { min: 715, max: 732, grade: 1.6 },
    { min: 697, max: 714, grade: 1.7 },
    { min: 679, max: 696, grade: 1.8 },
    { min: 661, max: 678, grade: 1.9 },
    { min: 643, max: 660, grade: 2.0 },
    { min: 625, max: 642, grade: 2.1 },
    { min: 607, max: 624, grade: 2.2 },
    { min: 589, max: 606, grade: 2.3 },
    { min: 571, max: 588, grade: 2.4 },
    { min: 553, max: 570, grade: 2.5 },
    { min: 535, max: 552, grade: 2.6 },
    { min: 517, max: 534, grade: 2.7 },
    { min: 499, max: 516, grade: 2.8 },
    { min: 481, max: 498, grade: 2.9 },
    { min: 463, max: 480, grade: 3.0 },
    { min: 445, max: 462, grade: 3.1 },
    { min: 427, max: 444, grade: 3.2 },
    { min: 409, max: 426, grade: 3.3 },
    { min: 391, max: 408, grade: 3.4 },
    { min: 373, max: 390, grade: 3.5 },
    { min: 355, max: 372, grade: 3.6 },
    { min: 337, max: 354, grade: 3.7 },
    { min: 319, max: 336, grade: 3.8 },
    { min: 301, max: 318, grade: 3.9 },
    { min: 300, max: 300, grade: 4.0 },
  ];

  for (const range of gradeTable) {
    if (points >= range.min && points <= range.max) {
      return range.grade;
    }
  }

  // Assume no misuse with 300 <= points <= 900
  return -1;
}

export function GradeToPoints15(grade: number): number {
    return Math.max(0, Math.round(17 - 3 * grade));
}

export function PointsToGrade15(points: number): number {
    const map: number[] = [
        6,   // 0 points
        5.3, // 1
        5,   // 2
        4.7, // 3
        4.3, // 4
        4,   // 5
        3.7, // 6
        3.3, // 7
        3,   // 8
        2.7, // 9
        2.3, // 10
        2,   // 11
        1.7, // 12
        1.3, // 13
        1,   // 14
        0.7  // 15
    ];

    // We assume no misuse with 0 <= points <= 15
    return map[points];
}