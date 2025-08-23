import Course from "./Course";
import Exam from "./Exam";
import { Field } from "../implemented/ManagedCourse";

export default interface UserCourse{
    course: Course,
    isLK: boolean,
    isWrittenExamCourse: boolean,
    isOralExamCourse: boolean,
    writtenWeightPercantage: number,
    exams: Exam[],
    // Array of size 4 representing in which quarters of the years the user takes part in this course: 11.1, 11.2, 12.1, 12.2
    takesPartInQuarters: boolean[],
    // I, II or III. The field of 'expertise': liturature, societal, technical(maths, etc.)
    field: Field,
}