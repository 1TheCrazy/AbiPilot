import Course from "./Course";
import Exam from "./Exam";

export default interface UserCourse{
    course: Course,
    isLK: boolean,
    isWrittenExamCourse: boolean,
    isOralExamCourse: boolean,
    writtenWeightPercentage: number,
    exams: Exam[],
    // Array of size 5 representing in which quartes of the years the user takes part in this course: 11.1, 11.2, 12.1, 12.2
    // Entry 5 represents wether this is changable by the user (is false e.g. when the course is an exam course or lk)
    takesPartInQuarters: () => boolean[]
}