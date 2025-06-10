import Course from "./Course";
import PointWeights from "./PointWeights";
import UserCourse from "./UserCourse";

export default interface CountryState{
    mandatoryCourses: ReadonlyArray<Course>, 
    mandatoryNumberOfCourses: number, // The number of courses you need to let a grade count for the final grade
    pointWeights: PointWeights,
    nextCourses(currenCourses: UserCourse[]): UserCourse[], // A method for creating a valid arrangement of courses in each state depending on the courses chosen until now
    PPE(grade: number): number[], //Returns the number of Point Per Exam the user needs to score to achieve his/her grade goal 
                                  //First Entry are the points in a LK, Second Entry are the points in a BK, Third Entry are the points in a written Exam, Fourth Entry are the points in an oral Exam
    lowPointsTip: string[], // An array of tips a user can follow if he/she didn't reach his/her grade goal
}