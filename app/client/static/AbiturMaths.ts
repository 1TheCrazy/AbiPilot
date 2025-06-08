import CountryState from "./CountryState";

/**
 * Returns the number of Point Per Exam the user needs to score to achieve his/her grade goal 
 * @param state - The state of the user
 * @param grade - The target grade/goal of the user
 * @returns 
 * An array of the point distrebution.
 * First Entry are the points in a LK
 * Second Entry are the points in a BK
 * Third Entry are the points in a written Exam
 * Fourth Entry are the points in an oral Exam
 */
export function PPE(state: CountryState, grade: number): number[]{
    return [];
}

PPE

export function GradeToPoints900(grade: number): number{
    return 0;
}

export function PointsToGrade900(points: number): number{
    
    return Math.floor(((17 - points) / 3) * 10) / 10;
}

export function GradeToPoints15(grade: number): number{
    return (17 - (3 * grade))
}

export function PointsToGrade15(points: number): number{
    return (17 - (points / 3)); 
}