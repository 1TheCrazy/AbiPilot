import Course from "./Course";
import PointWeights from "./PointWeights";
import UserCourse from "./UserCourse";

export default interface CountryState{
    mandatoryCourses: ReadonlyArray<Course>, 
    mandatoryNumberOfCourses: number, // The number of courses you need to let a grade count for the final grade
    pointWeights: PointWeights,
    nextCourses(currenCourses: UserCourse[]): UserCourse[], // A method for creating a valid arrangement of courses in each state depending on the courses chosen until now
}