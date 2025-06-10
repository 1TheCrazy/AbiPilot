export function GradeToPoints900(grade: number): number {
    return Math.round(900 - (grade - 1) * 60);
}

export function PointsToGrade900(points: number): number {
    return Math.round((1 + (900 - points) / 60) * 10) / 10;
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