import Course from "./Course";

export default interface UserCourse{
    course: Course,
    isLK: boolean,
    isWrittenExamCourse: boolean,
    isOralExamCourse: boolean,
}