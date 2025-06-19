import Course from "./Course";
import Exam from "./Exam";

export default interface UserCourse{
    course: Course,
    isLK: boolean,
    isWrittenExamCourse: boolean,
    isOralExamCourse: boolean,
    writtenWeightPercentage: number,
    exams: Exam[],
    // Array of size 4 representing in which quarters of the years the user takes part in this course: 11.1, 11.2, 12.1, 12.2
    takesPartInQuarters: boolean[],
}