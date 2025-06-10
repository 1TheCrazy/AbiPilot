import UserCourse from "./UserCourse";

export default interface Exam{
    points: number, // The points a user got in this exam
    course: UserCourse, // The course this exam belongs to
    notes: string, // User notes of the exam
}