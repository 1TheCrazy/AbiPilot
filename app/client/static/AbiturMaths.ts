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
        6.0, // 0 points
        5.7, // 1
        5.3, // 2
        5.0, // 3
        4.7, // 4
        4.3, // 5
        4.0, // 6
        3.7, // 7
        3.3, // 8
        3.0, // 9
        2.7, // 10
        2.3, // 11
        2.0, // 12
        1.7, // 13
        1.3, // 14
        1.0  // 15
    ];

    // We assume no misuse with 0 <= points <= 15
    return map[points];
}