import Course from "./Course";
import Exam from "./Exam";

export default interface UserCourse{
    course: Course,
    isLK: boolean,
    isWrittenExamCourse: boolean,
    isOralExamCourse: boolean,
    writtenWeightPercentage: number,
    exams: Exam[],
}